import React, { Component } from 'react';

// Day of week names for use in date-picker heading
const dayOfWeekNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

const styles = {
  wrapper: {
    width: '100%'
  },
  day: {
    float: 'right',
    width: '14.28571429%'
  }
};

export default class DaysOfWeek extends Component {
  render() {
    return (<div className="days-of-week">
      { dayOfWeekNames.map((name, key) => <div style={styles.day} key={key}>{name}</div>) }
    </div>);
  }
}
