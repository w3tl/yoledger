import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

configure({ adapter: new Adapter() });

describe('Button', () => {
  it('should render correctly', () => {
    const output = shallow(
      <Button>Text</Button>,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle the click', () => {
    const onClick = jest.fn();
    const output = shallow(
      <Button onClick={onClick}>Text</Button>,
    );
    output.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
