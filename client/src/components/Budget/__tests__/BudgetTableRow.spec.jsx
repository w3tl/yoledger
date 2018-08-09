import React from 'react';
import { mount } from 'enzyme';
import BudgetTableRow from '../BudgetTableRow';
import { accounts } from '../mockData';
import { testRenderWithoutError } from '../../testHelpers';

const budget = accounts[0];

describe('BudgetTableRow', () => {
  testRenderWithoutError(<BudgetTableRow budget={budget} onChange={() => {}} />);

  it('should add an account and a period to the events', () => {
    const onChange = jest.fn();
    const wrapper = mount(<BudgetTableRow budget={budget} onChange={onChange} />);

    wrapper.find('BudgetCell').first().find('input').simulate('blur');
    expect(onChange).toHaveBeenCalledWith({
      date: budget.allocations[0].date,
      amount: budget.allocations[0].amount,
    });
  });
});
