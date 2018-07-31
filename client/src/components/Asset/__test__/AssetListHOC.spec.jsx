import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListWithData, { QUERY } from '../AssetListHOC';

configure({ adapter: new Adapter() });

const accounts = [{
  __typename: 'Account',
  id: '1',
  name: 'Bank Card',
  balance: 0,
}, {
  __typename: 'Account',
  id: '2',
  name: 'Cash',
  balance: 10,
}, {
  __typename: 'Account',
  id: '3',
  name: 'Bank Card 2',
  balance: 150,
}];

const MockComponent = ({ assets }) => ( // eslint-disable-line react/prop-types
  <ul>{assets.map(asset => <li key={asset.id}>{asset.length}</li>)}</ul>
);
const MockComponentWithData = ListWithData(MockComponent);

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('AssetListHOC', () => {
  it('renders without error', async () => {
    const mock = {
      request: {
        query: QUERY,
      },
      result: {
        data: { accounts },
      },
    };
    const wrapper = mount((
      <MockedProvider mocks={[mock]}>
        <MockComponentWithData />
      </MockedProvider>
    ));
    await wait();
    wrapper.update();
    expect(wrapper.update().find(MockComponent).prop('assets')).toHaveLength(3);
  });

  it('should render loading state initially', () => {
    const wrapper = mount((
      <MockedProvider mocks={[]}>
        <MockComponentWithData />
      </MockedProvider>
    ));
    expect(wrapper.text()).toEqual('Loading...');
  });

  it('should show error UI', async () => {
    const mock = {
      request: {
        query: QUERY,
      },
      error: new Error('awwh'),
    };
    const wrapper = mount(
      <MockedProvider mocks={[mock]}>
        <MockComponentWithData />
      </MockedProvider>,
    );
    await wait(0); // wait for response
    expect(wrapper.update().text()).toEqual('Error!');
  });
});
