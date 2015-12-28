import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar';
import moment from 'moment-jalali';

const styles = {
  wrapper: {
    position: 'relative'
  },
  calendarHidden: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(10px)'
  },
  calendarVisible: {
    visibility: 'visible',
    opacity: 1,
    transform: 'translateY(0)'
  },
  calendar: {
    position: 'absolute',
    top: '100%',
    left: 0,
    transition: 'all .3s ease',
    zIndex: '9999'
  }
};

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    children: PropTypes.node,
    min: PropTypes.object,
    max: PropTypes.object
  };

  static defaultProps = {
    displayFormat: 'jYYYY/jMM/jDD'
  };

  state = {
    visible: false,
    value: this.props.value,
    inputValue: this.props.value && typeof this.props.value === 'object' && this.props.value._isAMomentObject
      ? this.props.value.format(this.props.displayFormat)
      : ''
  };

  handleInputChange(event) {
    const { displayFormat } = this.props;
    const inputValue = event.target.value;
    const dateTime = moment(inputValue, displayFormat);
    this.setState({inputValue});
    if (this.handleChange(dateTime, true)) {
      this.setState({value: dateTime});
    }
  }

  handleChange(date, preserveInput = false) {
    const { onChange, displayFormat } = this.props;

    if (date.isValid()) {
      if (!preserveInput) {
        this.setState({
          inputValue: date.format(displayFormat)
        });
      }

      if (onChange) {
        onChange(date);
      }

      return true;
    }
  }

  handleSelect(date) {
    this.setVisibility(false);
    this.handleChange(date);
  }

  setVisibility(visible) {
    if (visible) {
      this.closing = true;
    }

    this.setState({visible});
  }

  handleInputFocus() {
    this.setVisibility(true);
  }

  handleInputBlur() {
    setTimeout(() => {
      if (this.closing) {
        this.setVisibility(false);
      } else {
        this.closing = true;
      }
    }, 200);
  }

  render() {
    const { visible, inputValue, value } = this.state;
    const { children, ...rest } = this.props;

    const calendarVisibilityStyle = visible ? styles.calendarVisible : styles.calendarHidden;
    const calendarStyles = {
      ...styles.calendar,
      ...calendarVisibilityStyle
    };

    return (<div style={styles.wrapper} className="calendar-datepicker">
      <input type="text" {...rest}
             onChange={this.handleInputChange.bind(this)}
             onFocus={this.handleInputFocus.bind(this)}
             onBlur={this.handleInputBlur.bind(this)}
             value={inputValue}
             ref="formatter"/>
      { children }
      <div style={calendarStyles}
           onClick={() => {this.closing = false;}}>
        <Calendar selectedDay={value}
                  onSelect={this.handleSelect.bind(this)}/>
      </div>
    </div>);
  }
}
