import React, { PropTypes } from 'react';
import moment from 'moment-jalaali';
import Calendar from './Calendar.js';

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
    transition: 'all .3s ease'
  }
};

function stopPropagation(event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}

export default class DatePicker extends React.Component {
  static propTypes = {
    formatterInput: PropTypes.object,
    inputFormat: PropTypes.string,
    onSelect: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    inputFormat: 'jYYYY/jMM/jDD',
    formatterInput: {}
  };

  state = {
    selected: moment()
  };

  componentWillMount() {
    this.selected = false;

    document.addEventListener('click', this.blur);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputFormat !== this.props.inputFormat) {
      return true;
    }

    if (nextState.selected !== this.state.selected || nextState.visible !== this.state.visible) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    this.selected = false;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.blur);
  }

  onFormat(event) {
    const { inputFormat, formatterInput } = this.props;
    formatterInput.value = event.target.value;
    const date = moment(formatterInput.value, inputFormat);

    if (date.isValid()) {
      this.select(date, false);
    } else {
      this.forceUpdate();
    }
  }

  selected = true;

  select(date, selected = true) {
    const state = this.state;
    let visible = state.visible;

    const { onSelect } = this.props;
    if (typeof onSelect === 'function') {
      onSelect(date);
    }

    if (selected) {
      this.selected = true;
      visible = false;
    }

    this.setState({
      ...state,
      visible,
      selected: date
    });
  }

  focus = () => {
    const state = this.state;

    this.setState({
      ...state,
      visible: true
    });
  }

  blur = () => {
    const state = this.state;

    this.setState({
      ...state,
      visible: false
    });
  }

  keyUp = (event) => {
    if (event.keyCode === 13) {
      // Let the enter key hide the Calendar
      event.preventDefault();
      this.blur();
    } else if (!this.state.visible) {
      // Show the calendar if the user started typing on the input
      this.focus();
    }
  }

  render() {
    const { formatterInput, inputFormat, children, ...rest } = this.props;
    const { visible, selected } = this.state;
    const currentCalendarStyle = visible ? styles.calendarVisible : styles.calendarHidden;
    const calendarStyle = styles.calendar;

    if (selected && this.selected) {
      formatterInput.value = selected.format(inputFormat);
    }

    return (<div style={styles.wrapper}>
      <input {...formatterInput} onClick={stopPropagation} onChange={::this.onFormat} onFocus={this.focus}
                                 onKeyUp={this.keyUp} ref="formatter"/>
      {children}
      <div style={{...currentCalendarStyle, ...calendarStyle}} onClick={stopPropagation}>
        <Calendar {...rest} selectedDay={selected} onSelect={::this.select}/>
      </div>
    </div>);
  }
}
