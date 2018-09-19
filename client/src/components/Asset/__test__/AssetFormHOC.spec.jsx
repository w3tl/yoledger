import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import RawAssetForm, { updateAfterAdd } from '../AssetFormHOC';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers';


const AssetForm = withProvider((props) => {
  props.client.writeQuery({ query: LIST_QUERY, data: { assets: [] } });
  return <RawAssetForm />;
});

describe('AssetFormHOC', () => {
  testLoadingState(<AssetForm />);

  describe('updateAfterAdd', () => {
    it('should update assets cache', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({ assets: [] }),
        writeQuery,
      };
      const data = { addAccount: { account: { type: 'ASSET' } } };
      updateAfterAdd(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });
  });

  it('should contain props', async () => {
    const wrapper = mount(<AssetForm />);
    await wait();
    wrapper.update();
    const form = wrapper.find('AssetForm');
    expect(form.prop('asset').id).toBeDefined();
  });

  it('should successfully add asset', async () => {
    const wrapper = mount(<AssetForm />);
    await wait();
    wrapper.update();
    wrapper.find('input[name="name"]').first().simulate('change', { target: { value: 'new account' } });
    wrapper.find('form').simulate('submit');
    await wait(1);
    wrapper.update();
    const { assets } = client.readQuery({ query: LIST_QUERY });
    expect(assets).toHaveLength(1);
  });
});
