import React from 'react';
import { configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TransactionTypeSelect from '../TransactionTypeSelect';

configure({ adapter: new Adapter() });

describe('TransactionTypeSelect', () => {
  it('should render correctly', () => {
    const output = mount(
      <TransactionTypeSelect value="income" />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
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
