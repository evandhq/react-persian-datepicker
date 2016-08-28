import React, { Component, PropTypes } from 'react';
import moment from 'moment-jalali';
import TimePicker from 'rc-time-picker-evand';
import { outsideClickIgnoreClass } from '../../../src/index';
import 'rc-time-picker-evand/assets/index.css';

export default class MyTimePicker extends Component {
  static propTypes = {
    momentValue: PropTypes.object,
    setMomentValue: PropTypes.func
  };

  handleChange(value) {
    const { momentValue, min } = this.props;
    let newValue;

    if (momentValue) {
      newValue = momentValue.clone();
    } else if (min && min.isAfter(moment())) {
      newValue = min.clone();
    } else {
      newValue = moment(value);
    }

    newValue.hour(value.hour());
    newValue.minute(value.minute());

    this.props.setMomentValue(newValue);
  }

  render() {
    const { momentValue } = this.props;
    return (
      <div style={{marginBottom: 10}}>
        <div style={{ float: 'right', lineHeight: '30px' }}>ساعت: </div>
        <div style={{ float: 'left' }}>
          <TimePicker
            showAMPM
            showSecond={false}
            allowEmpty={false}
            ref="timePicker"
            value={momentValue}
            className={outsideClickIgnoreClass}
            popupClassName={outsideClickIgnoreClass}
            panelClassName={outsideClickIgnoreClass}
            onChange={this.handleChange.bind(this) }
            />
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }
}
