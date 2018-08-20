import React from 'react';
import { mount } from 'enzyme';
import BudgetTableBody from '../BudgetTableBody';
import { accounts, periods } from '../mockData';
import { withProvider, testLoadingState } from '../../testHelpers/index';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const fixedDate = new Date('2018-06-10');

const ComponentWithFixedDate = withProvider(() => (
  <BudgetTableBody
    Component={({ date }) => <div>{date}</div>}
    dateStart={fixedDate.toISOString()}
    count={4}
  />
));

describe('BudgetTableBodyHOC', () => {
  testLoadingState(<ComponentWithFixedDate mocks={[]} />);
  // testErrorUI(<ComponentWithFixedDate mocks={errorMocks} />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithFixedDate />);
    await wait();
    wrapper.update();
    expect(wrapper.find('BudgetTableBody').prop('accounts')).toHaveLength(accounts.length);
    expect(wrapper.find('BudgetTableBody').prop('periods')).toHaveLength(periods.length);
  });

  it('should call upsert with params and add to cache', async () => {
    const wrapper = mount(<ComponentWithFixedDate />);
    await wait();
    wrapper.update();
    wrapper.find('AccountInput').simulate('change', { target: { value: 'new account' } });
    wrapper.find('#add').simulate('click');
    await wait();
    wrapper.update();
    expect(wrapper.find('BudgetTableBody').prop('accounts')).toHaveLength(accounts.length + 1);
  });
});
