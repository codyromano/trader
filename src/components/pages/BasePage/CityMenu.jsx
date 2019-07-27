import React from 'react';

export default class CityMenu extends React.PureComponent {
  render() {
    const { currentCityId, cities, onChange } = this.props;
    return (
      <ul>
        {cities.map((city) => (
          <li>
            <button onClick={() => onChange(city)} disabled={city.id === currentCityId}>
              {city.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
