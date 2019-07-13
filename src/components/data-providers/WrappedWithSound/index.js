import React from 'react';
import PropTypes from 'prop-types';

// Ensures that we don't replace existing onClick handlers
// on the target children components
const wrapFn = (targetFn, wrapper) => (...args) => {
  wrapper(...args);
  return targetFn(...args);
};
const emptyFn = () => {};

/**
* A container that plays a sound effect when the user interacts
* with any of its child components.
*/
export class SoundEffect extends React.Component {
  static propTypes = {
    listenerType: PropTypes.oneOf(['onClick', 'onMouseDown']),
    onError: PropTypes.func
  };
  static defaultProps = {
    listenerType: 'onClick',
    onError: console.error.bind(console)
  };
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }
  playSound() {
    try {
      const audio = document.createElement('audio');
      audio.src = this.props.audioUrl;
      audio.play();
    } catch (error) {
      this.props.onError(error);
    }
  }
  render() {
    const { listenerType, children } = this.props;
    /* An alternative would be rendering <audio>. Though this is more declarative,
    it requires adding an additional wrapper in the DOM, and playback will stop
    when SoundEffect unmounts. It's a trade-off... */
    return React.Children.map(
      children,
      child => React.cloneElement(child, {
        [listenerType]: wrapFn(child.props.onClick || emptyFn, this.playSound)
      })
    );
  }
}

export const withSound = (soundOptions = {}) => (Component) => (props) => (
  <SoundEffect {...soundOptions}>
    <Component {...this.props} />
  </SoundEffect>
);
