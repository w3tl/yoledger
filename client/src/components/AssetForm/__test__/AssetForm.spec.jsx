import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import AssetForm from '../AssetForm';

configure({ adapter: new Adapter() });

describe('AssetForm', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AssetForm
        name="Card"
        balance={13.3}
        onSave={() => {}}
      />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle submit button click', () => {
    const onSave = jest.fn();
    const output = mount(
      <AssetForm
        name="Card"
        balance={13.3}
        onSave={onSave}
      />,
    );
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: 'Card',
      balance: 13.3,
    });
  });
});
