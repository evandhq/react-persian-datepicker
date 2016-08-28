import React, { Component, PropTypes } from 'react';

// Day of week names for use in date-picker heading
const dayOfWeekNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export default class DaysOfWeek extends Component {
  static propTypes = {
    styles: PropTypes.object
  };

  render() {
    const { styles } = this.props;

    return (
      <div className={styles.daysOfWeek}>
        { dayOfWeekNames.map((name, key) => <div key={key}>{name}</div>) }
      </div>
    );
  }
}
