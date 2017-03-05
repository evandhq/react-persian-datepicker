# React Persian Date Picker :calendar:

[Persian calendar](https://en.wikipedia.org/wiki/Solar_Hijri_calendar) and date picker components for [React](https://facebook.github.io/react/). This is an open source project made in [@evandhq](https://github.com/evandhq) team.

[See the demo.](https://evandhq.github.io/react-persian-datepicker)

<p dir="rtl">
<strong>React Persian Date Picker</strong> مجموعه‌ای از کامپوننت‌های ReactJS مورد نیاز جهت ایجاد ورود و نمایش تاریخ هجری شمسی است. این نرم‌افزار متن‌باز در ایوند توسعه یافته‌است.
</p>

<p dir="rtl">
  <a href="https://evandhq.github.io/react-persian-datepicker">نسخه نمایشی را اینجا ببینید.</a>
</p>

# Installation

Use npm to install the package:

```
npm install react-persian-datepicker --save
```

# Usage
This package offers two components, `Calendar` and `DatePicker`. The first of which is a simple calendar that you can use in whichever way you want. The second one is an actual input with an input-ish behaviour.

This package uses [moment-jalaali](https://github.com/jalaali/moment-jalaali) under the hood and all the values are basically moment objects.

Below is a basic example.

```es6
import React from 'react';
import { Calendar, DatePicker } from 'react-persian-datepicker';

const MyComponent = () => (
  <div>
    <div>
      {/* Calendar Component */}
      <Calendar />
    </div>
    
    <div>
      {/* Date Picker Component */}
      <DatePicker />
    </div>
  </div>
);
```

For more examples [take a look at here](https://github.com/evandhq/react-persian-datepicker/blob/master/examples/src/components/App.js#L43).
