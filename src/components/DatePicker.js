import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-jalali';
import TetherComponent from 'react-tether';
import Calendar from './Calendar';
import classnames from 'classnames';

export const outsideClickIgnoreClass = 'ignore--click--outside';

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
    min: PropTypes.object,
    max: PropTypes.object,
    defaultMonth: PropTypes.object,
    inputFormat: PropTypes.string,
    removable: PropTypes.bool,
    timePickerComponent: PropTypes.func,
    calendarStyles: PropTypes.object,
    calendarContainerProps: PropTypes.object
  };

  static defaultProps = {
    inputFormat: 'jYYYY/jM/jD',
    calendarStyles: require('../styles/basic.css'),
    calendarContainerProps: {}
  };

  state = {
    isOpen: false,
    momentValue: this.props.defaultValue || null,
    inputValue: this.props.defaultValue ?
      this.props.defaultValue.format(this.props.inputFormat) : ''
  };

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setMomentValue(nextProps.value);
    }
  }

  setMomentValue(momentValue) {
    const { inputFormat } = this.props;

    if (this.props.onChange) {
      this.props.onChange(momentValue);
    }

    let inputValue = "";
    if (momentValue)
      inputValue = momentValue.format(inputFormat);
    this.setState({ momentValue, inputValue });
  }

  handleFocus() {
    this.setOpen(true);
  }

  handleBlur(event) {
    const { onBlur, inputFormat } = this.props;
    const { momentValue } = this.state;

    if (onBlur) {
      onBlur(event);
    }

    if (momentValue) {
      const inputValue = momentValue.format(inputFormat);
      this.setState({ inputValue, isOpen: false });
    } else {
      this.setOpen(false);
    }
  }

  handleClickOutsideCalendar() {
    this.setOpen(false);
  }

  handleSelectDay(selectedDay) {
    const { momentValue: oldValue } = this.state;
    let momentValue = selectedDay.clone();

    if (oldValue) {
      momentValue = momentValue
        .set({
          hour: oldValue.hours(),
          minute: oldValue.minutes(),
          second: oldValue.seconds()
        });
    }

    this.setMomentValue(momentValue);
  }

  handleInputChange(event) {
    const { inputFormat } = this.props;
    const inputValue = event.target.value;
    const momentValue = moment(inputValue, inputFormat);

    if (momentValue.isValid()) {
      this.setState({ momentValue });
    }

    this.setState({ inputValue });
  }

  handleInputClick() {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  renderInput() {
    let { isOpen, inputValue } = this.state;

    if (this.props.value) {
      let value = this.props.value;
      let inputFormat = this.props.inputFormat;
      inputValue = value.format(inputFormat);
    }

    const className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: isOpen
    });

    return (
      <div>
        <input
          className={className}
          type="text"
          ref="input"
          onFocus={this.handleFocus.bind(this) }
          onBlur={this.handleBlur.bind(this) }
          onChange={this.handleInputChange.bind(this) }
          onClick={this.handleInputClick.bind(this) }
          value={inputValue}
        />
      </div>
    );
  }

  renderCalendar() {
    const { momentValue } = this.state;
    const { timePickerComponent: TimePicker, onChange, min, max, defaultMonth, calendarStyles, calendarContainerProps } = this.props;

    return (
      <div>
        <Calendar
          min={min}
          max={max}
          selectedDay={momentValue}
          defaultMonth={defaultMonth}
          onSelect={this.handleSelectDay.bind(this) }
          onClickOutside={this.handleClickOutsideCalendar.bind(this) }
          outsideClickIgnoreClass={outsideClickIgnoreClass}
          styles={calendarStyles}
          containerProps={calendarContainerProps}
        >
          {
            TimePicker ? (
              <TimePicker
                min={min}
                max={max}
                momentValue={momentValue}
                setMomentValue={this.setMomentValue.bind(this) }
              />
            ) : null
          }
        </Calendar>
      </div>
    );
  }

  removeDate() {
    const {onChange} = this.props;
    if (onChange) {
      onChange('');
    }
    this.setState({
      input: '',
      inputValue: ''
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <TetherComponent attachment="top center">
        { this.renderInput() }
        { isOpen ? this.renderCalendar() : null }
      </TetherComponent>
    );
  }
}
