import React from 'react';
import { mount } from 'enzyme';
import ListWithData from '../ExpenseListHOC';
import accounts from '../mockData';
import {
  wait, withProvider, testLoadingState,
} from '../../testHelpers/index';

const MockComponent = ({ expenses }) => ( // eslint-disable-line react/prop-types
  <ul>{expenses.map(account => <li key={account.id}>{account.length}</li>)}</ul>
);

const ComponentWithData = ListWithData(MockComponent);
const ComponentWithProvider = withProvider(() => (
  <ComponentWithData />
));


describe('ExpenseListHOC', () => {
  testLoadingState(<ComponentWithProvider />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithProvider />);
    await wait();
    wrapper.update();
    expect(wrapper.update().find('MockComponent').prop('expenses')).toHaveLength(accounts.length);
  });
});
