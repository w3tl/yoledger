import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AssetForm from '../AssetForm';

configure({ adapter: new Adapter() });

const asset = {
  __typename: 'Account',
  id: '1',
  name: 'Card',
  balance: 15,
};

describe('AssetForm', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AssetForm asset={asset} />,
    );
    expect(output.debug()).toMatchSnapshot();
  });

  it('should handle submit on edit mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <AssetForm asset={asset} onSave={onSave} />,
    );
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: 'Card',
      balance: 15,
    });
  });

  it('should handle submit on create mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <AssetForm onSave={onSave} />,
    );
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: '',
      balance: 0,
    });
  });
});
