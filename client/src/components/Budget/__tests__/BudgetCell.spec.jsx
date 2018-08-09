import React from 'react';
import { mount } from 'enzyme';
import BudgetCell from '../BudgetCell';
import { testRenderWithoutError } from '../../testHelpers';

describe('BudgetCell', () => {
  testRenderWithoutError(<BudgetCell amount={10} />);

  it('should handle the save button click', () => {
    const onUpdate = jest.fn();
    const output = mount(
      <BudgetCell amount={10} onUpdate={onUpdate} />,
    );

    output.find('input').simulate('blur');
    expect(onUpdate).toHaveBeenCalledWith({ amount: 10 });
  });
});
