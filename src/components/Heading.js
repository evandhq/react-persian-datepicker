import React, { Component, PropTypes } from 'react';
import { persianNumber } from './../helpers/persian';
import { leftArrow, rightArrow } from './../helpers/assets';

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
    prevMonth: PropTypes.func.isRequired
  };

  render() {
    const { nextMonth, prevMonth } = this.context;
    const { month } = this.props;

    return (<div className="heading">
      { persianNumber(month.format('jMMMM jYYYY')) }
      <button type="button"
              title="ماه قبل"
              style={styles.button}
              className="prev-month"
              onClick={prevMonth}
              dangerouslySetInnerHTML={leftArrow}/>
      <button type="button"
              title="ماه بعد"
              style={styles.button}
              className="next-month"
              onClick={nextMonth}
              dangerouslySetInnerHTML={rightArrow}/>
    </div>);
  }
}
