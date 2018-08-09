import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListWithData, { QUERY } from '../TransactionListHOC';
import transactions from '../mockData';

configure({ adapter: new Adapter() });

const MockComponent = ({ transactions: data }) => ( // eslint-disable-line react/prop-types
  <ul>{data.map(trans => <li key={trans.id}>{trans.length}</li>)}</ul>
);
const MockComponentWithData = ListWithData(MockComponent);

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('TransactionListHOC', () => {
  it('renders without error', async () => {
    const mock = {
      request: {
        query: QUERY,
        variables: {
          dateStart: new Date('2018-01-01').toISOString(),
        },
      },
      result: {
        data: { transactions },
      },
    };
    const wrapper = mount((
      <MockedProvider mocks={[mock]}>
        <MockComponentWithData />
      </MockedProvider>
    ));
    await wait();
    wrapper.update();
    expect(wrapper.find(MockComponent).prop('transactions')).toHaveLength(transactions.length);
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
