import React from 'react';

const preloadImage = async (imageSrc) => new Promise((resolve) => {
  const img = document.createElement('img');
  img.onload = resolve;
  img.src = imageSrc;
});

export default class Image extends React.Component {
  state = {
    loaded: false,
    error: false,
  };

  loadImage = async (props) => {
    const { src, height, width } = props;

    try {
      await preloadImage(src);

      setTimeout(() => {
        this.setState({
          loaded: true,
        })
      }, 0);
    } catch (error) {
      console.error('Error loading image: ' + JSON.stringify(error));
    }
  };

  async componentDidMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadImage(nextProps);
  }

  render() {
    const { height, width, src, cover } = this.props;
    const backgroundSize = cover ? 'cover' : 'contain';

    let style;
    if (this.style && this.style.background.includes(src)) {
      // Use cached style object
      style = this.style;
    } else {
      style = {
        display: 'inline-block',
        height,
        width,
        background: `url(${src}) center no-repeat`,
        backgroundSize,
      };
    }

    if (this.state.loaded) {
      return (
        <div style={style} />
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