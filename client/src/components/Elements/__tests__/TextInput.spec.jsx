import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../TextInput';

configure({ adapter: new Adapter() });

describe('TextInput', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TextInput value="text" />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle the input event', () => {
    const onChange = jest.fn();
    const output = shallow(
      <TextInput value="text" onChange={onChange} />,
    );
    output.simulate('change', 'new text');
    expect(onChange).toHaveBeenCalledWith('new text');
  });
});
