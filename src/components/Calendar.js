import React, { Component, PropTypes } from 'react';
import Heading from './Heading';
import DaysOfWeek from './DaysOfWeek';
import MonthSelector from './MonthSelector';
import Day from './Day';
import { getDaysOfMonth } from '../utils/moment-helper';
import moment from 'moment-jalali';

// Load Persian localisation
moment.loadPersian();

export default class Calendar extends Component {
  static propTypes = {
    min: PropTypes.object,
    max: PropTypes.object,
    selectedDay: PropTypes.object,
    defaultMonth: PropTypes.object,
    onSelect: PropTypes.func
  };

  static childContextTypes = {
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired
  };

  state = {
    month: this.props.defaultMonth || this.props.selectedDay || moment(),
    selectedDay: this.props.selectedDay || null,
    mode: 'days'
  };

  getChildContext() {
    return {
      nextMonth: this.nextMonth.bind(this),
      prevMonth: this.prevMonth.bind(this),
      setCalendarMode: this.setMode.bind(this),
      setMonth: this.setMonth.bind(this)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDay !== nextProps.selectedDay) {
      this.selectDay(nextProps.selectedDay);
    }
  }

  setMode(mode) {
    this.setState({mode});
  }

  setMonth(month) {
    this.setState({month});
  }

  nextMonth() {
    this.setState({
      month: this.state.month.clone().add(1, 'jMonth')
    });
  }

  prevMonth() {
    this.setState({
      month: this.state.month.clone().subtract(1, 'jMonth')
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

  days = null;
  lastRenderedMonth = null;

  renderMonthSelector() {
    const { month } = this.state;
    return (<MonthSelector selectedMonth={month}/>);
  }

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

    return (<div>
      <Heading month={month}/>
      <DaysOfWeek/>
      <div className="calendar-container">
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
      </div>
    </div>);
  }

  render() {
    const { min, max, ...rest } = this.props;
    const { mode } = this.state;

    return (<div className={'calendar'} {...rest}>
      { mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays() }
    </div>);
  }
}
