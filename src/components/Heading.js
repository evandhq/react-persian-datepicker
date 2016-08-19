import React, { Component, PropTypes } from 'react';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

const styles = {
  button: {
    outline: 'none'
  }
};

export default class Heading extends Component {
  static propTypes = {
    month: PropTypes.object.isRequired
  };

  static contextTypes = {
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired
  };

  handleMonthClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('monthSelector');
  }

  render() {
    const { nextMonth, prevMonth } = this.context;
    const { month } = this.props;

    return (
      <div className="heading">
        <button className="month-button" onClick={this.handleMonthClick.bind(this)}>
          { persianNumber(month.format('jMMMM jYYYY')) }
        </button>
        <button
          type="button"
          title="ماه قبل"
          style={styles.button}
          className="prev"
          onClick={prevMonth}
          dangerouslySetInnerHTML={rightArrow}
        />
        <button
          type="button"
          title="ماه بعد"
          style={styles.button}
          className="next"
          onClick={nextMonth}
          dangerouslySetInnerHTML={leftArrow}
        />
      </div>
    );
  }
}
