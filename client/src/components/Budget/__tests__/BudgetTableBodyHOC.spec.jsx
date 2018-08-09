import React from 'react';
import { mount } from 'enzyme';
import { QUERY, UPDATE_MUTATION } from '../BudgetTableBodyHOC';
import BudgetTableBody from '../BudgetTableBody';
import { accounts } from '../mockData';
import {
  withProvider, testLoadingState, testErrorUI, stubDate,
} from '../../testHelpers';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const fixedDate = new Date('2018-06-10');

const queryMock = {
  request: {
    query: QUERY,
    variables: { dateStart: fixedDate.toISOString(), count: 4 },
  },
  result: {
    data: { budgets: { accounts } },
  },
};

const account = accounts[0];
const updateMock = success => ({
  request: {
    query: UPDATE_MUTATION,
    variables: {
      input: {
        account: account.account.name,
        date: account.allocations[0].date,
        amount: account.allocations[0].amount,
      },
    },
  },
  result: { data: { upsertBudget: { success } } },
});

const mocks = [queryMock, updateMock(true)];

const errorMocks = [{
  ...queryMock,
  error: new Error('awwh'),
}];

const ComponentWithFixedDate = withProvider(() => (
  <BudgetTableBody dateStart={fixedDate.toISOString()} count={4} />
));

describe('BudgetTableBodyHOC', () => {
  stubDate(fixedDate);

  testLoadingState(<ComponentWithFixedDate mocks={[]} />);
  testErrorUI(<ComponentWithFixedDate mocks={errorMocks} />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithFixedDate mocks={mocks} addTypename={false} />);
    await wait();
    wrapper.update();
    expect(wrapper.find('BudgetTableBody').prop('accounts')).toHaveLength(accounts.length);
  });

  it('should call upsert with params', async () => {
    const wrapper = mount(<ComponentWithFixedDate mocks={mocks} addTypename={false} />);
    await wait();
    wrapper.update();
    wrapper.find('BudgetCell').first().find('input').simulate('blur');
    await wait();
    wrapper.update();
  });
});
