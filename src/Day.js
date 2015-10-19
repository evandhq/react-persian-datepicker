import React, { PropTypes } from 'react';
import { PersianNumber } from 'react-persian';

export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool,
    isDisabled: PropTypes.bool,
    selected: PropTypes.bool,
    handleClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    isCurrentMonth: false
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.selected !== this.props.selected || nextProps.isDisabled !== this.props.isDisabled || nextProps.isCurrentMonth !== this.props.isCurrentMonth) {
      return true;
    }

    return false;
  }

  render() {
    const { isDisabled, day, handleClick } = this.props;
    let classes = ['day'];

    if (this.props.isCurrentMonth) {
      classes.push('current-month');
    }

    if (this.props.selected) {
      classes.push('selected');
    }

    classes = classes.join(' ');

    return (<div className="day-wrapper">
      <button type="button" disabled={isDisabled} className={classes} onClick={handleClick}>
        <PersianNumber>{day.format('jD')}</PersianNumber>
      </button>
    </div>);
  }
}
