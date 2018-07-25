import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import withLabel from '../withLabel';

configure({ adapter: new Adapter() });

function Component() {
  return <input type="text" />;
}

const ComponentWithLabel = withLabel(Component);

describe('TextInput', () => {
  it('should render correctly', () => {
    const output = shallow(
      <ComponentWithLabel id="comp1" label="Label" />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('ыhould substitute a label instead of id if the id is not specified', () => {
    const output = shallow(
      <ComponentWithLabel label="Label" />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
