import React from 'react';
import Work from './Work';
import { addGameTime } from './Time';
import { withGameDatabase } from './withDatabase';

const jobs = [
  {
    id: 'job-1',
    title: `Cashier`,
    cashPerHour: 8.5,
    educationRequirements: [],
  },
  {
    id: 'job-2',
    title: 'Journalist',
    cashPerHour: 14,
    educationRequirements: [],
  },
  {
    id: 'job-3',
    title: 'Retail store manager',
    cashPerHour: 10,
    educationRequirements: [],
  },
].sort((jobA, jobB) => (jobA.cashPerHour > jobB.cashPerHour ? 1 : -1));

const mapTaskIdToCashPerHour = jobs.reduce((result, job) => {
  result[job.id] = job.cashPerHour;
  return result;
}, {});

const playerEducation = {};

class WorkContainer extends React.Component {
  state = {
    // id => { startTime, endTime}
    activeTasks: {},
    cashEarned: 0,
    taskCompleted: 0,
  };

  componentDidMount() {
    this.pollForCompletedTasks = setInterval(this.removeCompletedTasks, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.pollForCompletedTasks);
  }

  removeCompletedTasks = () => {
    const {
      databaseValues: { player },
    } = this.props;
    const now = Date.now();

    let tasksRemoved = 0;
    let cashEarned = 0;

    for (const [taskId, { endTime }] of Object.entries(player.activeTasks)) {
      if (endTime <= now) {
        tasksRemoved += 1;
        cashEarned += mapTaskIdToCashPerHour[taskId];
        delete player.activeTasks[taskId];
      }
    }
    if (tasksRemoved) {
      player.cash += cashEarned;

      // throw new Error('fix above');

      this.props.setItem('player', { ...player });
      this.setState({
        cashEarned,
        tasksCompleted: tasksRemoved,
      });
    }
  };

  onWorkRequested = (job, workStartTime, hours) => {
    const taskRecord = {
      [job.id]: {
        startTime: workStartTime,
        endTime: addGameTime(1, workStartTime),
      },
    };
    const { player } = this.props.databaseValues;

    this.props.setItem('player', {
      ...player,
      activeTasks: {
        ...player.activeTasks,
        ...taskRecord,
      },
    });
  };

  render() {
    const {
      databaseValues: {
        player: { activeTasks },
      },
    } = this.props;
    const { cashEarned, tasksCompleted } = this.state;

    return (
      <Work
        jobs={jobs}
        activeTasks={activeTasks}
        onWorkRequested={this.onWorkRequested}
        playerEducation={playerEducation}
        cashEarned={cashEarned}
        tasksCompleted={tasksCompleted}
      />
    );
  }
}

export default withGameDatabase(WorkContainer, ['player']);
