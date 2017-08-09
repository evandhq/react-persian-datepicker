# API Documentation
This documentation is for **v3.0.2**. if you are using another version, you may update this file and make a PR. Contributions are totally welcomed ;)

## DatePicker
A jalaali date picker component for react.

### Example
```
import {DatePicker} from 'react-persian-datepicker'
// or const DatePicker = require('react-persian-datepicker').DatePicker

...
render () {
  return <DatePicker />;
}
```
For more examples please visit [github page](https://evandhq.github.io/react-persian-datepicker/) or see `examples/` directory.

### Options

Property            | Type   | Default        | Required | Description
:-------------------|:------:|:--------------:|:--------:|:----------------------------------------
value               | object |    null        |          | usable to create controlled datepicker, if `defaultValue` provided it takes it's value
defaultValue   | object |    null        |          | sets default value for datepicker
onChange       |   func  |            |          | it sends updated `momentjs` object as argument to provided function. By default it sets the datepicker value, if you need to implement this, consider updating `value` accordingly
onFocus         |   func   |            |          | by default it makes datepicker visible. if you need to implement this, please see `handleFocus` method in the [source code](https://github.com/thg303/react-persian-datepicker/blob/master/src/components/DatePicker.js#L63)
onBlur           |   func   |            |          | it sends actual `blur` event as argument, by default it handles visibility and the value of the datepicker and then runs this callback.
children         |   node  |            |          | it is not used in this component, (propbably should be removed in the next version)
min               | object |             |          | accepts a `Date` or `Moment` object as the minimum value for datepicker
max              | object |             |          | accepts a `Date` or `Moment` object as the maximum value for datepicker
defaultMonth| object |             |          | sets Calendar's default starting month, see `Calendar` documentations below for more details.
inputFormat  | string | "jYYYY/jM/jD" |          | sets how date should appear in the input field. see [moment-jalaali documentations](https://github.com/jalaali/moment-jalaali) for more details
removable  |  bool  |             |          | it is not used in this component, (propbably should be removed in the next version)
timePickerComponent |   func   |            |          |  if provided, it would show up in the datepicker. it should be a React Component which accepts four properties: `min`, `max`, `momentValue`, `setMomentValue`, datepicker will send corrsendponding `min`, `max` and `momentValue` and uses `setMomentValue` which sets the datepicker value internally. for more details see the [source code](https://github.com/thg303/react-persian-datepicker/blob/master/src/components/DatePicker.js), you may also find an implemented TimePicker component at [examples/src/components/MyTimePicker.js](https://github.com/evandhq/react-persian-datepicker/blob/master/examples/src/components/MyTimePicker.js)
calendarStyles| object |   [basic.css](https://github.com/thg303/react-persian-datepicker/blob/master/src/styles/basic.css)  |          | css object which will be used in the `Calendar` component
calendarContainerProps| object |   `{}`  |          |  this object will be passed as `containerProps` in the `Calendar` component

## Calendar
A jalaali Calendar for react. It uses **Persian** locales by default.

### Example
```
import {Calendar} from 'react-persian-datepicker'
// or const Calendar = require('react-persian-datepicker').Calendar

...
render () {
  return <Calendar />;
}
```
For more examples please visit [github page](https://evandhq.github.io/react-persian-datepicker/) or see `examples/` directory.

### Options

Property            | Type   | Default        | Required | Description
:-------------------|:------:|:--------------:|:--------:|:----------------------------------------
min                  | object |                 |            | accepts a `Date` or `Moment` object as the minimum day for Calendar
max              | object |             |          | accepts a `Date` or `Moment` object as the maximum day for Calendar
styles            | object |   [basic.css](https://github.com/thg303/react-persian-datepicker/blob/master/src/styles/basic.css)  |          | css object which will be used.
selectedDay | object |    null        |          | sets default selected day
defaultMonth| object |             |          | sets Calendar's default starting month, if not set, the `selectedDay`'s month will be used, if it was not set too, it sets current month.
onSelect       |   func  |            |          | if provided, it will be called after user clicked on a day. the `selectedDay` (moment object) will be passed as argument to the function.
onClickOutside |   func  |            |          | if provided, it will be called after user clicked outside of calendar. it uses [react-onclickoutside package](https://github.com/Pomax/react-onclickoutside) and used by `DatePicker` component
containerProps | object |   `{}`  |          | it is not used in this component, (propbably should be removed in the next version)

## outsideClickIgnoreClass
It is a simple string "ignore--click--outside" used as a class flag in CSS.

---
Documentation by [thg303](https://github.com/thg303) at 2017/8/9
