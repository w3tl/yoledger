import React from 'react';
import { mount } from 'enzyme';
import IncomeForm from '../IncomeForm';
import { testRenderWithoutError } from '../../testHelpers';
import incomes from '../mockData';

const income = incomes[0];

describe('IncomeForm', () => {
  // TODO: test create mode
  testRenderWithoutError(<IncomeForm income={income} />);

  it('should handle submit on edit mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <IncomeForm income={income} onSave={onSave} />,
    );
    expect(output.state('isCreate')).toBeFalsy();
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: income.name,
    });
  });

  it('should handle submit on create mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <IncomeForm onSave={onSave} />,
    );
    expect(output.state('isCreate')).toBeTruthy();
    output.find('input').simulate('change', { target: { value: 'new account' } });
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: 'new account',
    });
  });
});
