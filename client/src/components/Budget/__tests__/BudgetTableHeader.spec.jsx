import React from 'react';
import { mount } from 'enzyme';
import { BudgetTableHeaderComponent } from '../BudgetTableHeader';
import { periods } from '../mockData';
import { testRenderWithoutError } from '../../testHelpers';

describe('BudgetTableHeader', () => {
  testRenderWithoutError(<BudgetTableHeaderComponent periods={periods} onNext={() => {}} />);

  it('should handle next and prev button click', () => {
    const onNext = jest.fn();
    const output = mount(<BudgetTableHeaderComponent periods={periods} onNext={onNext} />);

    output.find('#nextButton').first().simulate('click');
    expect(onNext).toHaveBeenCalledWith(periods[1]);
  });
});
