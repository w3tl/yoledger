/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import RawBudgetTableRow from '../BudgetTableRow';
import { accounts } from '../mockData';

const periods = [new Date('2018-06-10'), new Date('2018-06-25'), new Date('2018-07-10')];

const BudgetTableRow = props => (
  <table>
    <tbody>
      <RawBudgetTableRow
        account={accounts[0]}
        periods={periods}
        {...props}
      />
    </tbody>
  </table>
);

describe('BudgetTableRow', () => {
  it('should call upsert', () => {
    const onUpdate = jest.fn();
    const wrapper = mount(<BudgetTableRow onUpdate={onUpdate} />);
    wrapper.find('BudgetTableCell').first().find('AmountInput').simulate('blur');
    expect(onUpdate.mock.calls[0]).toMatchSnapshot();
  });
});
