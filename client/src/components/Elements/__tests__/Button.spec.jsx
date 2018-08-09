import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Button from '../Button';

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
