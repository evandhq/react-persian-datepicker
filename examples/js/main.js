const {Calendar, DatePicker} = require('./../../src');
const ReactDOM = require('react/lib/ReactDOM');
const React = require('react');
const moment = require('moment-jalali');

const initBasicSample = () => {
  const el = document.getElementById('basic-calendar');
  const result = document.getElementById('basic-calendar-result');
  ReactDOM.render(<Calendar onSelect={date => result.textContent = date.format('jD/jMM/jYYYY')}/>, el);
};

const initDatePickerSample = () => {
  const el = document.getElementById('datepicker');
  ReactDOM.render(<DatePicker min={moment()}
                              selectedDays={[moment(), moment().add('days', 1)]}
                              onChange={date => console.log(date)}
                              value={moment()}
                              removable={true}/>, el);
};

const initMinMaxSample = () => {

};

const initDefaultMonthSample = () => {

};

initBasicSample();
initDatePickerSample();
initMinMaxSample();
initDefaultMonthSample();