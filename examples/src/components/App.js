import React, { Component } from 'react';
import Example from './Example';
import styles from './App.css';
import { Calendar, DatePicker } from '../../../src/index';
import MyTimePicker from './MyTimePicker';
import moment from 'moment-jalali';

const generateRandomMoment = () => {
  return moment()
    .hour(Math.round(Math.random() * 23))
    .minute(Math.round(Math.random() * 60))
    .add(Math.round(Math.random() * 100), 'day');
}

export default class App extends Component {
  state = {
    value: moment(),
    someValue: new moment()
  };

  render() {
    return (
      <div>
        <a
          className="github-fork-ribbon"
          href="https://github.com/evandhq/react-persian-datepicker"
          title="مشاهده در گیت‌هاب"
        >
          مشاهده در گیت‌هاب
        </a>
        <div className={styles.jumbotron}>
          <h1>React Persian Date Picker</h1>
          <p>
            پروژه‌ای از <a href="https://evand.ir">ایوند</a>
          </p>
          <p>
            <a href="https://github.com/evandhq/react-persian-datepicker" className="btn">
              دریافت پروژه
            </a>
          </p>
        </div>
        <div className={styles.examples}>
          <div>
            <Example
              title="ورودی تاریخ ساده"
              code={basicDatePickerCode}
            >
              <DatePicker />
            </Example>
          </div>
          <div>
            <Example
              title="ورودی تاریخ ساده بسته شدن خودکار"
              code={basicAutoDatePickerCode}>
              <DatePicker closeOnSelect/>
            </Example>
          </div>
          <div>
            <Example
              title="ورود تاریخ کنترل شده"
              code={clearDatePickerCode}
            >
              <DatePicker
                value={this.state.someValue}
                onChange={value => this.setState({ someValue: value })}
              />
              <div style={{ paddingTop: 15 }}>
                <button onClick={() => this.setState({ someValue: null }) }>
                  حذف مقدار
                </button>
              </div>
            </Example>
          </div>
          <div>
            <Example
              title="ورودی تاریخ و کنترل مقدار"
              code={controlledDatePickerCode}
            >
              <DatePicker
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
              <div style={{ paddingTop: 15 }}>
                <button onClick={() => this.setState({ value: generateRandomMoment() }) }>
                  مقدار تصادفی
                </button>
              </div>
            </Example>
          </div>
          <div>
            <Example
              title="ورودی تاریخ و ساعت"
              // description="این کامپوننت رفتاری مشابه یک input ساده دارد. می‌توانید از propهای onChange و value استفاده کنید. مقادیر برگشتی و قابل قبول یک آبجکت moment خواهد بود."
              code={dateTimePickerCode}
            >
              <DatePicker
                timePickerComponent={MyTimePicker}
                inputFormat="jYYYY/jM/jD hh:mm A"
                min={moment().subtract(10, 'days')}
                max={moment().add(50, 'days')}
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
              <div style={{ paddingTop: 15 }}>
                <button onClick={() => this.setState({ value: generateRandomMoment() }) }>
                  مقدار تصادفی
                </button>
              </div>
            </Example>
          </div>
          <div>
            <Example
              title="تقویم ساده"
              code={basicExampleCode}
            >
              <Calendar />
            </Example>
          </div>
        </div>
      </div>
    );
  }
}

const basicDatePickerCode = `render() {
  return <DatePicker />;
}`;

const basicAutoDatePickerCode = `render() {
  return <DatePicker closeOnSelect/>;
}`;


const clearDatePickerCode = `render() {
  return (
    <div>
      <DatePicker
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
      <button onClick={() => this.setState({ value: null }) }>
        حذف مقدار
      </button>
    </div>
  );
}`;

const controlledDatePickerCode = `render() {
  return (
    <div>
      <DatePicker
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
      <button onClick={() => this.setState({ value: generateRandomMoment() }) }>
        مقدار تصادفی
      </button>
    </div>
  );
}`;

const dateTimePickerCode = `render() {
  return (
    <div>
      <DatePicker
        timePickerComponent={MyTimePicker}
        inputFormat="jYYYY/jM/jD hh:mm A"
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
      <button onClick={() => this.setState({ value: generateRandomMoment() })}>
        مقدار تصادفی
      </button>
    </div>
  );
};`;

const basicExampleCode = `render() {
  return <Calendar />;
};`;