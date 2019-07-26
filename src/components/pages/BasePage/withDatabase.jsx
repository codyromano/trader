import React from 'react';
import createUniqueId from 'uuid/v1';

// Simple persistent storage
// Returns promises in case implementation is changed to a real DB
class Database {
  constructor(namespace) {
    this.namespace = namespace;
    this.subscribers = {};
  }

  subscribe(key, listener) {
    const subscriberId = createUniqueId();
    this.subscribers[key] = this.subscribers[key] || {};
    this.subscribers[key][subscriberId] = listener;

    // Return a method to unsubscribe
    return this.unsubscribe.bind(this, key, subscriberId);
  }

  unsubscribe(key, subscriberId) {
    delete this.subscribers[key][subscriberId];
  }

  async save(key, value) {
    localStorage.setItem(`${this.namespace}_${key}`, JSON.stringify(value));

    // Notify subscribers
    Object.values(this.subscribers[key] || {}).forEach((subscribeMethod) => {
      subscribeMethod(key, value);
    });
  }

  async get(key) {
    const stored = localStorage.getItem(`${this.namespace}_${key}`);
    return stored ? JSON.parse(stored) : null;
  }
}

// HOC to provide the wrapped component with methods for
// updating and accessing values from the database
class WithDatabase extends React.Component {
  static emptyDatabaseValues = Object.freeze({});

  getItem = async (key) => this.props.database.get(key);
  setItem = async (key, value) => {
    this.props.database.save(key, value);
  };

  async loadInitialValuesFromDatabase() {
    const values = {};
    const { database, subscribe } = this.props;

    for (const subscribeToDatabaseKey of subscribe) {
      const value = await database.get(subscribeToDatabaseKey);
      values[subscribeToDatabaseKey] = value;
    }

    this.setState(values);
  }

  async componentDidMount() {
    await this.loadInitialValuesFromDatabase();

    const { database, subscribe } = this.props;
    this.unsubscribeMethods = [];

    for (const subscribeToDatabaseKey of subscribe) {
      this.unsubscribeMethods.push(
        database.subscribe(subscribeToDatabaseKey, this.onSubscribedDatabaseValueChange),
      );
    }
  }

  componentWillUnmount() {
    for (const unsubscribe of this.unsubscribeMethods) {
      unsubscribe();
    }
  }

  onSubscribedDatabaseValueChange = (key, newValue) => {
    this.setState({
      [key]: newValue,
    });
  };

  render() {
    const { component: Component, database, subscribe, ...restProps } = this.props;
    return (
      <Component
        databaseValues={this.state || WithDatabase.emptyDatabaseValues}
        setItem={this.setItem}
        {...restProps}
      />
    );
  }
}

WithDatabase.defaultProps = {
  subscribe: [],
};

const createWithDatabaseHOC = (namespace) => {
  const db = new Database(namespace);

  const withDatabase = (WrappedComponent, subscribe = []) => (props) => (
    <WithDatabase {...props} database={db} component={WrappedComponent} subscribe={subscribe} />
  );

  return withDatabase;
};

export const withGameDatabase = createWithDatabaseHOC('game');
export default createWithDatabaseHOC;
