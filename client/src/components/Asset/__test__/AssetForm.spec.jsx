import React from 'react';
import { mount } from 'enzyme';
import AssetForm from '../AssetForm';
import { testRenderWithoutError } from '../../testHelpers';
import assets from '../mockData';

const asset = assets[0];

describe('AssetForm', () => {
  testRenderWithoutError(<AssetForm asset={asset} />);

  it('should handle submit on edit mode', () => {
    const onSave = jest.fn();
    const output = mount(
      <AssetForm asset={asset} onSave={onSave} />,
    );
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      name: asset.name,
      balance: asset.balance,
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
