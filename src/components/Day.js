import React, { Component, PropTypes } from 'react';
import { persianNumber } from '../utils/persian';

const styles = {
  wrapper: {
    padding: 5,
    float: 'right',
    width: '14.28571429%'
  },
  button: {
    outline: 'none',
    cursor: 'pointer'
  }
};

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.selected !== this.props.selected ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.isCurrentMonth !== this.props.isCurrentMonth;
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onClick, day } = this.props;

    if (onClick) {
      onClick(day);
    }
  }

  render() {
    const { day, disabled, selected, isCurrentMonth, onClick, ...rest } = this.props;
    const className = [];

    if (selected) {
      className.push('selected');
    }

    if (isCurrentMonth) {
      className.push('current-month');
    }

    return (
      <div
        className="day-wrapper"
        style={styles.wrapper}
      >
        <button
          type="button"
          onClick={this.handleClick.bind(this)}
          disabled={disabled}
          className={className.join(' ')}
          style={styles.button}
          {...rest}
        >
          { persianNumber(day.format('jD')) }
        </button>
      </div>
    );
  }
}
