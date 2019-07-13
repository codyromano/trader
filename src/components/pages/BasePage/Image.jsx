import React from 'react';

const preloadImage = async (imageSrc) => new Promise((resolve) => {
  const img = document.createElement('img');
  img.onload = resolve;
  img.src = imageSrc;
});

const cached = {};

export default class Image extends React.Component {
  state = {
    loaded: false,
  };

  async componentDidMount() {
    if (cached[src]) {
      return;
    }
    const { src, height, width } = this.props;
    await preloadImage(src);
    cached[src] = true;

    requestIdleCallback(() => {
      this.setState({
        loaded: true,
      })
    });
  }

  render() {
    const { height, width, src } = this.props;
    this.style = this.style || {
      display: 'inline-block',
      height,
      width,
      marginRight: '0.5rem',
      backgroundSize: 'cover',
      backgroundImage: `url(${src})`,
    };
    if (cached[src]) {
      return (
        <div style={this.style} />
      );
    }
    const placeholderStyle = {
      display: 'inline-block',
      height,
      width,
      backgroundColor: '#fef',
    };
    return <div style={placeholderStyle} />;
  }
}