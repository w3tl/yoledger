import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import AccountInput from '../AccountInput';

configure({ adapter: new Adapter() });

describe('AccountInput', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AccountInput value="Card" />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle the input event', () => {
    const onChange = jest.fn();
    const output = shallow(
      <AccountInput onChange={onChange} />,
    );
    output.simulate('change', 'Train');
    expect(onChange).toHaveBeenCalledWith('Train');
  });
});
