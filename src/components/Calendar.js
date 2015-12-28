import React, { Component, PropTypes } from 'react';
import Heading from './Heading';
import DaysOfWeek from './DaysOfWeek';
import Day from './Day';
import { getDaysOfMonth } from './../helpers/utils';
import moment from 'moment-jalali';

// Load Persian localisation
moment.loadPersian();

export default class Calendar extends Component {
  static propTypes = {
    selectedDay: PropTypes.object,
    defaultMonth: PropTypes.object,
    onSelect: PropTypes.func
  };

  static childContextTypes = {
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDay !== nextProps.selectedDay) {
      this.selectDay(nextProps.selectedDay);
    }
  }

  state = {
    month: this.props.defaultMonth || this.props.selectedDay || moment(),
    selectedDay: this.props.selectedDay || null
  };

  days = null;
  lastRenderedMonth = null;

  getChildContext() {
    return {
      nextMonth: this.nextMonth.bind(this),
      prevMonth: this.prevMonth.bind(this)
    };
  }

  nextMonth() {
    this.setState({
      month: this.state.month.clone().add(1, 'months')
    });
  }

  prevMonth() {
    this.setState({
      month: this.state.month.clone().subtract(1, 'months')
    });
  }

  selectDay(selectedDay) {
    const { month } = this.state;
    if (selectedDay.format('jYYYYjMM') !== month.format('jYYYYjMM')) {
      this.setState({month: selectedDay});
    }

    this.setState({selectedDay});
  }

  handleClickOnDay = selectedDay => {
    const { onSelect } = this.props;
    this.selectDay(selectedDay);
    if (onSelect) {
      onSelect(selectedDay);
    }
  };

  renderDays() {
    const { month, selectedDay } = this.state;
    const { min, max } = this.props;
    let days;

    if (this.lastRenderedMonth === month) {
      days = this.days;
    } else {
      days = getDaysOfMonth(month);
      this.days = days;
      this.lastRenderedMonth = month;
    }

    return (<div className="calendar-container">
      {
        days.map(day => {
          const isCurrentMonth = day.format('jMM') === month.format('jMM');
          const disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
          const selected = selectedDay ? selectedDay.isSame(day, 'day') : false;

          return (<Day
            key={day.format('YYYYMMDD')}
            onClick={this.handleClickOnDay}
            day={day}
            disabled={disabled}
            selected={selected}
            isCurrentMonth={isCurrentMonth}/>);
        })
      }
    </div>);
  }

  render() {
    const { ...rest } = this.props;
    const { month } = this.state;
    return (<div className={'calendar'} {...rest}>
      <Heading month={month}/>
      <DaysOfWeek/>
      { this.renderDays() }
    </div>);
  }
}
