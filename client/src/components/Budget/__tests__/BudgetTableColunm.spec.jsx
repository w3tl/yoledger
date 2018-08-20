import React from 'react';
import { mount } from 'enzyme';
import { BudgetTableColumnComponent } from '../BudgetTableColumn';
import { periods, accounts, budgets } from '../mockData';
import { testRenderWithoutError } from '../../testHelpers';

describe('BudgetTableColumn', () => {
  testRenderWithoutError(
    <BudgetTableColumnComponent date={periods[0]} accounts={accounts} budget={budgets[0]} />,
  );

  it('should handle update cell', () => {
    const onUpdate = jest.fn();
    const wrapper = mount(
      <BudgetTableColumnComponent
        date={periods[0]}
        accounts={accounts}
        budget={budgets[0]}
        onUpdate={onUpdate}
      />,
    );

    wrapper.find('BudgetCell').first().find('input').simulate('blur');
    expect(onUpdate.mock.calls).toMatchSnapshot();
  });
});
