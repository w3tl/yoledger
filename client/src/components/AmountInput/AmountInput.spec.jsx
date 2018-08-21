import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AmountInput from './AmountInput';

configure({ adapter: new Adapter() });

describe('AmountInput', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AmountInput value={10} />,
    );
    expect(output).toMatchSnapshot();
  });

  it('should handle the input event', () => {
    const onChange = jest.fn();
    const output = shallow(
      <AmountInput onChange={onChange} />,
    );
    output.simulate('change', 10.1);
    expect(onChange).toHaveBeenCalledWith(10.1);
  });
});
