import React from 'react';
import ImageButton from './ImageButton';
import Currency from './Currency';
import { Row, Col } from './Grid';
import { STARTING_CASH, STARTING_DEBT, TRAVEL_COST } from './constants';

export default class Travel extends React.Component {
  listItemStyle = {
    display: 'inline-block'
  };
  listStyle = {
    margin: '0px',
    padding: '0px',
  }

  images = {
    'Chicago': 'https://media.timeout.com/images/105439616/630/472/image.jpg',
    'Boston': 'http://www.north-end-boston.com/images/northend/northend_mickle229.jpg?1288910742',
    'LA': 'https://www.aada.edu/template/frontend/img/campus-overview/la-1.jpg',
    'Seattle': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwQ70XCH3v_LlpsXd1kw1RpGtO40AnBLE8RqBKZyipptkHsqIv'
  };

  constructor(props) {
    super(props);
    this.cities = ['Chicago', 'Boston', 'LA', 'Seattle'];
  }
  render() {
    const { availableCash } = this.props;
    
    if (availableCash >= TRAVEL_COST) {
      return (
        <Row>
          <ul style={this.listStyle}>
            {this.cities.map(cityName => (
              <li style={this.listItemStyle} key={cityName}>
                <ImageButton
                  imageSrc={this.images[cityName]}
                  label={
                    <React.Fragment>
                      <strong>{cityName}</strong> - <Currency n={TRAVEL_COST}/>
                    </React.Fragment>
                  }
                  onClick={() => this.props.onCitySelected(cityName)}
                />
              </li>
            ))}
          </ul>
        </Row>
      );
    }
    return (
      <div>You don't have enough cash to travel. Traveling costs
      <Currency n={TRAVEL_COST} />.</div>
    )
  }
}
