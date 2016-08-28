# React Persian Date Picker :calendar:

[Persian calendar](https://en.wikipedia.org/wiki/Solar_Hijri_calendar) and date picker components for [React](https://facebook.github.io/react/). This is an open source project made in [@evandhq](https://github.com/evandhq) team.

[See the demo.](evandhq.github.io/react-persian-datepicker)

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

Note that you need `css-loader` for `/\.css$/` files enabled to have the styles working as we use css modules to put classnames in place. Otherwise, you'll have to pass an object of class names (like a css module) as `styles` prop. This way, you can develop your own stylesheet for the calendar according to the [basic one](https://github.com/evandhq/react-persian-datepicker/blob/master/src/styles/basic.css). The only thing that you will need to do is to require the css file that you made and pass it as `styles` prop to either `Calendar` or `DatePicker`.
