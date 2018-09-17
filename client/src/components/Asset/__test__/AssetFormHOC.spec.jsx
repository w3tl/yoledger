import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import formWithData from '../AssetFormHOC';
import RawAssetForm from '../AssetForm';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const AssetForm = formWithData(RawAssetForm);
const FormWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { type: 'ASSET' },
    data: { accounts: [] },
  });
  return <AssetForm />;
});
const FormWithLocationState = withProvider(() => (
  <AssetForm location={{ state: { id: '1' } }} />
));

describe('AssetFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<FormWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<FormWithLocationState />);
      await wait();
      wrapper.update();
      const form = wrapper.find('AssetForm');
      expect(form.prop('asset').id).toBeDefined();
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    it('should successfully add asset', async () => {
      const wrapper = mount(<FormWithoutLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('input').first().simulate('change', { target: { value: 'new account' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { accounts } = client.readQuery({
        query: LIST_QUERY,
        variables: { type: 'ASSET' },
      });
      expect(accounts).toHaveLength(1);
    });
  });
});
