import React from 'react';
import Example from './Example';
import styles from './App.css';
import { Calendar, DatePicker } from '../../../src/index';

export default () => (
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
        یکی از پروژه‌های <a href="https://evand.ir">ایوند</a>
      </p>
    </div>
    <div className={styles.examples}>
      <div>
        <Example
          title="ورودی تاریخ"
          description="این کامپوننت رفتاری مشابه یک input ساده دارد. می‌توانید از propهای onChange و value استفاده کنید. مقادیر برگشتی و قابل قبول یک آبجکت moment خواهد بود."
          code={basicDatePickerCode}
        >
          <DatePicker />
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

const basicDatePickerCode = `render() {
  return <DatePicker />;
};`;

const basicExampleCode = `render() {
  return <Calendar />;
};`;