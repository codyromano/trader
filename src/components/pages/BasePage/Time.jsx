import React from 'react';
import { Text } from './Typography';

const ONE_MINUTE = 60 * 1000;
// The unit of game time that is equivalent to an hour in real life
const TIME_UNIT = ONE_MINUTE;

export const describeGameTime = (duration) => {
  const figure = duration / TIME_UNIT;
  const noun = Math.floor(figure) !== 1 ? 'hours' : 'hour';
  return `${figure.toFixed(1)} ${noun}`;
};

export const addGameTime = (hours, startTime) => startTime + hours * TIME_UNIT;

export const withCurrentTime = (WrappedComponent) => {
  class WithTime extends React.Component {
    state = {
      currentTime: Date.now(),
    };
    componentDidMount() {
      this.timerActive = true;
      this.updateTime = setInterval(() => {
        if (this.timerActive) {
          this.setState({
            currentTime: Date.now(),
          });
        }
      }, 1000);
    }
    componentWillUnmount() {
      this.timerActive = false;
      clearInterval(this.updateTime);
    }
    pauseTimer = () => {
      this.timerActive = false;
    };
    resumeTimer = () => {
      this.timerActive = true;
    };

    render() {
      return (
        <WrappedComponent
          currentTime={this.state.currentTime}
          pauseTimer={this.pauseTimer}
          resumeTimer={this.resumeTimer}
          {...this.props}
        />
      );
    }
  }
  return (props) => <WithTime {...props} />;
};

class BaseTimeProgress extends React.Component {
  render() {
    const { currentTime } = this.props;
    const { startTime, endTime } = this.props;

    if (currentTime >= endTime) {
      this.props.pauseTimer();
    }

    return <progress min={0} max={endTime - startTime} value={currentTime - startTime} />;
  }
}

export const TimeProgress = withCurrentTime(BaseTimeProgress);
