const Calendar = require('./../../src/Calendar');
const React = require('react');

const initBasicSample = () => {
  const el = document.getElementById('basic-calendar');
  const result = document.getElementById('basic-calendar-result');
  React.render(<Calendar
    onSelect={
      (date) => {
        result.textContent = date.format('jD/jMM/jYYYY');
      }
    }
    />, el);
};

const initMinMaxSample = () => {
  const el = document.getElementById('min-max-calendar');
  React.render(<Calendar
    min={new Date()}
    max={new Date(Date.now() + 85600000 * 10)}
    />, el);
};

const initDefaultMonthSample = () => {
  const el = document.getElementById('default-month-calendar');
  React.render(<Calendar
    month={new Date(746641200000)}
    />, el);
};

initBasicSample();
initMinMaxSample();
initDefaultMonthSample();