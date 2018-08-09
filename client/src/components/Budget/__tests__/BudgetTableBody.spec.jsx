import React from 'react';
import { mount } from 'enzyme';
import { BudgetTableBodyComponent } from '../BudgetTableBody';
import { testRenderWithoutError } from '../../testHelpers';
import { accounts } from '../mockData';

describe('BudgetTableBody', () => {
  testRenderWithoutError(<BudgetTableBodyComponent accounts={accounts} onUpdate={() => {}} />);

  it('should call onUpdate with variables', () => {
    const onUpdate = jest.fn();
    const output = mount(
      <BudgetTableBodyComponent accounts={accounts} onUpdate={onUpdate} />,
    );

    output.find('input').first().simulate('blur');
    expect(onUpdate.mock.calls[0]).toMatchSnapshot();
  });
});
