/* eslint-disable react/prop-types */
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormWithData, { QUERY, ADD_MUTATION } from '../AssetFormHOC';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const asset = {
  __typename: 'Account',
  id: '1',
  name: 'Bank Card',
  balance: 0,
};

const queryRequest = {
  request: {
    query: QUERY,
    variables: { id: '1' },
  },
  result: {
    data: { account: { __typename: 'Account', ...asset } },
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
        account: { __typename: 'Account', ...asset },
      },
    },
  },
};

const MockComponent = ({ onSave }) => (
  <button type="button" onClick={() => onSave({ ok: 1 })} />
);

const MockComponentWithData = FormWithData(MockComponent);

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('AssetFormHOC', () => {
  describe('with router id params', () => {
    const allMocks = [queryRequest, addAccountRequest];

    const withProvider = (WrappedComponent, props) => mount(
      <MockedProvider mocks={allMocks}>
        <WrappedComponent {...props} />
      </MockedProvider>,
    );

    it('should successfully load', async () => {
      const wrapper = withProvider(MockComponentWithData, {
        location: { state: { id: '1' } },
      });
      await wait();
      wrapper.update();
      expect(wrapper.find(MockComponent).prop('asset')).toEqual(expect.objectContaining(asset));
      expect(wrapper.find(MockComponent).prop('onSave')).toBeDefined();
    });

    it('should render loading state initially', () => {
      const wrapper = withProvider(MockComponentWithData, {
        location: { state: { id: '1' } },
      });
      expect(wrapper.text()).toEqual('Loading...');
    });

    it('should show error UI', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: { id: '1' },
        },
        error: new Error('awwh'),
      };
      const wrapper = mount(
        <MockedProvider mocks={[mock]}>
          <MockComponentWithData location={{ state: { id: '1' } }} />
        </MockedProvider>,
      );
      await wait();
      expect(wrapper.update().text()).toEqual('Error query!');
    });
  });

  describe('without router id params', () => {
    const allMocks = [addAccountRequest];

    const withProvider = (WrappedComponent, props) => mount(
      <MockedProvider mocks={allMocks}>
        <WrappedComponent {...props} />
      </MockedProvider>,
    );

    it('should successfully load', async () => {
      const wrapper = withProvider(MockComponentWithData);
      await wait();
      wrapper.update();
      expect(wrapper.find(MockComponent).prop('asset')).not.toBeDefined();
      expect(wrapper.find(MockComponent).prop('onSave')).toBeDefined();
    });

    it('should successfully add asset', async () => {
      const wrapper = withProvider(MockComponentWithData, {
        match: { url: '/add' },
      });
      await wait();
      wrapper.update();
      wrapper.find('button').simulate('click');
      await wait(10);
      wrapper.update();
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });
});
