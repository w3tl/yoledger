/* eslint-disable react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import BudgetPage from '../BudgetPage';
import { stubDate } from '../../testHelpers';

const Body = ({ onPeriodChange }) => (
  <button type="button" onClick={() => onPeriodChange('2018-01-01')} />
);

const fixedDate = new Date('2018-06-10');
describe('BudgetPage', () => {
  stubDate(fixedDate);

  it('state should contain periods from current date', () => {
    const output = shallow(
      <BudgetPage control={Body} />,
    );
    expect(output.state('periods')).toMatchSnapshot();
  });

  it('should change dateStart when period change', () => {
    const output = mount(
      <BudgetPage control={Body} />,
    );
    output.find('button').simulate('click');
    expect(output.state('periods')).toMatchSnapshot();
  });
});
