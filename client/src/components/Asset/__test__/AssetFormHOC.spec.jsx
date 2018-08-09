/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import formWithData, { QUERY, ADD_MUTATION } from '../AssetFormHOC';
import AssetForm from '../AssetForm';
import assets from '../mockData';
import {
  wait, withProvider, testLoadingState, testErrorUI,
} from '../../testHelpers';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const asset = assets[0];
const queryRequest = {
  request: {
    query: QUERY,
    variables: { id: '1' },
  },
  result: {
    data: { account: asset },
  },
};

const addAccountRequest = {
  request: {
    query: ADD_MUTATION,
    variables: {
      input: { ok: 1, type: 'ASSET' },
    },
  },
  result: {
    data: {
      addAccount: {
        account: asset,
      },
    },
  },
};

const ComponentWithData = formWithData(AssetForm);
const ComponentWithoutLocationState = withProvider(() => (
  <ComponentWithData />
));
const ComponentWithLocationState = withProvider(() => (
  <ComponentWithData location={{ state: { id: '1' } }} />
));

describe('AssetFormHOC', () => {
  describe('with router id params', () => {
    const mocks = [queryRequest, addAccountRequest];
    const errorMocks = [{ ...queryRequest, error: new Error('awwh') }];

    testLoadingState(<ComponentWithLocationState mocks={[]} />);
    testErrorUI(<ComponentWithLocationState mocks={errorMocks} />);

    it('should contain props', async () => {
      const wrapper = mount(<ComponentWithLocationState mocks={mocks} />);
      await wait();
      wrapper.update();
      const form = wrapper.find('AssetForm');
      expect(form.prop('asset')).toEqual(expect.objectContaining(asset));
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    const mocks = [addAccountRequest];
    const errorMocks = [{ ...addAccountRequest, error: new Error('awwh') }];

    testLoadingState(<ComponentWithLocationState mocks={[]} />);
    testErrorUI(<ComponentWithLocationState mocks={errorMocks} />);

    it('should successfully add asset', async () => {
      const wrapper = mount(<ComponentWithoutLocationState mocks={mocks} />);
      await wait();
      wrapper.update();
      wrapper.find('button').simulate('click');
      await wait(1);
      wrapper.update();
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });
});
