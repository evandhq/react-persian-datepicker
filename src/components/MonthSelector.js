import React, { Component, PropTypes } from 'react';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';
import moment from 'moment-jalali';

// List of months
const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

const styles = {
  wrapper: {
    width: '100%',
    clear: 'both'
  },
  button: {
    float: 'right',
    width: '33.33333333%',
    height: '25%'
  },
  navButton: {
    outline: 'none'
  }
};

export default class MonthSelector extends Component {
  static propTypes = {
    selectedMonth: PropTypes.object.isRequired
  };

  static contextTypes = {
    setCalendarMode: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired
  };

  state = {
    year: this.props.selectedMonth
  };

  nextYear() {
    this.setState({
      year: this.state.year.clone().add(1, 'year')
    });
  }

  prevYear() {
    this.setState({
      year: this.state.year.clone().subtract(1, 'year')
    });
  }

  handleClick(key) {
    const { setMonth, setCalendarMode } = this.context;
    setMonth(moment(key, 'jM-jYYYY'));
    setCalendarMode('days');
  }

  render() {
    const { year } = this.state;
    const { selectedMonth } = this.props;

    return (<div className="month-selector">
      <div className="heading">
        { persianNumber(year.format('jYYYY')) }
        <button type="button"
                title="سال قبل"
                style={styles.navButton}
                className="prev"
                onClick={this.prevYear.bind(this)}
                dangerouslySetInnerHTML={rightArrow}/>
        <button type="button"
                title="سال بعد"
                style={styles.navButton}
                className="next"
                onClick={this.nextYear.bind(this)}
                dangerouslySetInnerHTML={leftArrow}/>
      </div>
      <div className="months-list" style={styles.wrapper}>
        {
          months.map((name, key) => {
            const buttonFingerprint = (key + 1) + '-' + year.format('jYYYY');
            const selectedMonthFingerprint = selectedMonth.format('jM-jYYYY');
            const classes = [];
            const isCurrent = selectedMonthFingerprint === buttonFingerprint;

            if (isCurrent) {
              classes.push('selected-month');
            }

            return (<button className={classes.join(' ')}
                            isCurrent={isCurrent}
                            style={styles.button}
                            key={key}
                            onClick={this.handleClick.bind(this, buttonFingerprint)}>{name}</button>);
          })
        }
      </div>
    </div>);
  }
}
