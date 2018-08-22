/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import TransactionPage from '../TransactionPage';
import { testRenderWithoutError } from '../../testHelpers/index';

const date = new Date('2018-01-01').toISOString();

jest.mock('../TransactionListHOC', () => ({ dateStart, dateEnd }) => (
  <div id="List">
    {dateStart}
    {dateEnd}
  </div>));

jest.mock('../TransactionFormHOC', () => ({ dateStart, dateEnd, onClose }) => (
  <div id="Form">
    {dateStart}
    {dateEnd}
    <button type="button" id="close" onClose={onClose}>Close</button>
  </div>));

const PageWithDayPeriod = <TransactionPage period="DAY" date={date} />;
const PageWithWeekPeriod = <TransactionPage period="WEEK" date={date} />;

describe('TransactionPage', () => {
  testRenderWithoutError(PageWithDayPeriod);
  testRenderWithoutError(PageWithWeekPeriod);

  it('should hide transaction form initially and show after button click', () => {
    const output = mount(PageWithDayPeriod);
    expect(output.state('isAddMode')).toBeFalsy();
    output.find('#addTrans').simulate('click');
    expect(output.state('isAddMode')).toBeTruthy();
    expect(output).toMatchSnapshot();
  });

  // it('should handle change period', () => {
  //
  // });
  //
  // it('should handle change dates', () => {
  //
  // });
});
