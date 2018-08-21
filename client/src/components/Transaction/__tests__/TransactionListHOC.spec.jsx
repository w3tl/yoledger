import React from 'react';
import { mount } from 'enzyme';
import ListWithData from '../TransactionListHOC';
import transactions from '../mockData';
import {
  wait, withProvider, testLoadingState,
} from '../../testHelpers/index';

const MockComponent = ({ transactions: data }) => ( // eslint-disable-line react/prop-types
  <ul>{data.map(trans => <li key={trans.id}>{trans.length}</li>)}</ul>
);

const ComponentWithData = ListWithData(MockComponent);
const ComponentWithProvider = withProvider(() => (
  <ComponentWithData />
));

describe('TransactionListHOC', () => {
  testLoadingState(<ComponentWithProvider />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithProvider />);
    await wait();
    wrapper.update();
    expect(wrapper.find(MockComponent).prop('transactions')).toHaveLength(transactions.length);
  });
});
