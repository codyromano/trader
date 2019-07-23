import React from 'react';

export default class RangeWithPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valuePreview: props.value,
      textInputValue: props.value,
    };
  }

  onValueChange = (event) => {
    const valuePreview = parseInt(event.target.value);
    this.setState({
      valuePreview,
      textInputValue: valuePreview
    })
    this.props.onChange(event);
  };

  isValid(event) {
    const { min, max } = this.props;
    const number = parseInt(event.target.value);

    if (isNaN(number)) {
      return false;
    }
    if (number > max || number < min) {
      return false;
    }
    return true;
  }

  onTextChange = (event) => {
    const newState = {
      textInputValue: event.target.value,
    };
    if (this.isValid(event)) {
      newState.valuePreview = parseInt(event.target.value);

      /*
      this.props.onChange({
        target: {
          value: parseInt(event.target.value)
        }
      });
      */
    }

    this.setState(newState);
    this.updateRangeAfterTextInput(event);
  };

  updateRangeAfterTextInput = (event) => {
    if (!this.isValid(event)) {
      const fallbackValue = this.getFallbackValueForInvalidTextInput(event);

      this.setState({
        valuePreview: fallbackValue,
      })
    }
  };

  getFallbackValueForInvalidTextInput = (event) => {
    const { min, max } = this.props;
    const number = parseInt(event.target.value);
    let fallbackValue;

    if (isNaN(number) || number < min) {
      fallbackValue = 0;
    } else {
      fallbackValue = max;
    }
    return fallbackValue;
  };

  onTextBlur = (event) => {
    if (!this.isValid(event)) {
      const fallbackValue = this.getFallbackValueForInvalidTextInput(event);

      this.setState({
        textInputValue: fallbackValue,
        valuePreview: fallbackValue,
      })
      this.props.onChange({
        target: {
          value: fallbackValue
        }
      });
    } else {
      this.props.onChange({
        target: {
          value: parseInt(event.target.value)
        }
      })
    }
  };

  render() {
    const { max, min, value, isCurrency } = this.props;
    const { valuePreview, textInputValue } = this.state;

    const textInputStyle = {
      color: !this.isValid({
        target: {
          value: textInputValue
        }
      }) ? 'red' : '#000',
      width: `${max.toString().length + 2}ch`,
    }

    return (
      <React.Fragment>
        <input type="range" onChange={this.onValueChange} min={min} max={max} value={valuePreview} step={this.props.step} />
        &nbsp; {isCurrency && '$'}
        <input
          onBlur={this.onTextBlur}
          style={textInputStyle} type="text" min={min} max={max} maxlength={max.toString().length} value={textInputValue} onChange={this.onTextChange} />
      </React.Fragment>
    );
  }
}