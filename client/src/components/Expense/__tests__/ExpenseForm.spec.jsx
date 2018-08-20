import React from 'react';
import { mount } from 'enzyme';
import ExpenseForm from '../ExpenseForm';
import { testRenderWithoutError } from '../../testHelpers';
import expenses from '../mockData';

const expense = expenses[0];

describe('ExpenseForm', () => {
  // TODO: test create mode
  testRenderWithoutError(<ExpenseForm expense={expense} />);

  it('should handle submit on edit mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <ExpenseForm expense={expense} onSave={onSave} />,
    );
    expect(output.state('isCreate')).toBeFalsy();
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: expense.name,
    });
  });

  it('should handle submit on create mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <ExpenseForm onSave={onSave} />,
    );
    expect(output.state('isCreate')).toBeTruthy();
    output.find('input').simulate('change', { target: { value: 'new expense' } });
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: 'new expense',
    });
  });
});
