const Calendar = require('./../../src/Calendar');
const DatePicker = require('./../../src/DatePicker');
const ReactDOM = require('react/lib/ReactDOM');
const React = require('react');
const moment = require('moment-jalaali');

const initBasicSample = () => {
  const el = document.getElementById('basic-calendar');
  const result = document.getElementById('basic-calendar-result');
  ReactDOM.render(<Calendar
    onSelect={
      (date) => {
        result.textContent = date.format('jD/jMM/jYYYY');
      }
    }
    />, el);
};

const initDatePickerSample = () => {
  const el = document.getElementById('datepicker');

  ReactDOM.render(<DatePicker
    resultInput={{ disabled: true, type: 'hidden', value: '2015-05-10' }}
    />, el);
};

const initMinMaxSample = () => {
  const el = document.getElementById('min-max-calendar');
  ReactDOM.render(<Calendar
    min={moment()}
    max={moment().add(10, 'days')}
    />, el);
};

const initDefaultMonthSample = () => {
  const el = document.getElementById('default-month-calendar');
  ReactDOM.render(<Calendar
    month={moment('1372/06', 'jYYYY/jMM')}
    />, el);
};

initBasicSample();
initDatePickerSample();
initMinMaxSample();
initDefaultMonthSample();