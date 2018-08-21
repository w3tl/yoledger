/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { QUERY as LIST_QUERY } from '../AssetListHOC';
import formWithData from '../AssetFormHOC';
import AssetForm from '../AssetForm';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers/index';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const ComponentWithData = formWithData(AssetForm);
const ComponentWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { type: 'ASSET' },
    data: { accounts: [] },
  });
  return <ComponentWithData />;
});
const ComponentWithLocationState = withProvider(() => (
  <ComponentWithData location={{ state: { id: '1' } }} />
));

describe('AssetFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<ComponentWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<ComponentWithLocationState />);
      await wait();
      wrapper.update();
      const form = wrapper.find('AssetForm');
      expect(form.prop('asset').id).toBeDefined();
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    // NOTE: skip query without id in location
    // testLoadingState(<ComponentWithLocationState />);

    it('should successfully add asset', async () => {
      const wrapper = mount(<ComponentWithoutLocationState />);
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
