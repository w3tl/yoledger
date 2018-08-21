import React from 'react';
import { mount } from 'enzyme';
import TransactionTypeSelect from '../TransactionTypeSelect';

describe('TransactionTypeSelect', () => {
  it('should render correctly', () => {
    const output = mount(
      <TransactionTypeSelect value="income" />,
    );
    expect(output).toMatchSnapshot();
  });

  it('should handle the input event', () => {
    const onChange = jest.fn();
    const output = mount(
      <TransactionTypeSelect onChange={onChange} value="income" />,
    );
    output.find('#expense').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: 'expense' } });
    expect(output.find('#expense').prop('checked')).toBeTruthy();
    expect(output.find('#income').prop('checked')).toBeFalsy();
  });
});
