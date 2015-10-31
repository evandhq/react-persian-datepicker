import React, { PropTypes } from 'react';
import { PersianNumber } from 'react-persian';

export default class Heading extends React.Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    prevMonthElement: PropTypes.element.isRequired,
    nextMonthElement: PropTypes.element.isRequired
  };

  render() {
    const { month, onPrev, onNext, prevMonthElement, nextMonthElement } = this.props;

    return (<div className="heading">
      <PersianNumber>{month.format('jMMMM jYYYY')}</PersianNumber>
      <button type="button" className="prev-month" onClick={onPrev}>{prevMonthElement}</button>
      <button type="button" className="next-month" onClick={onNext}>{nextMonthElement}</button>
    </div>);
  }
}
