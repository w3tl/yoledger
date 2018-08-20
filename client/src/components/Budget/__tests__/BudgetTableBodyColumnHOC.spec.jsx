import React from 'react';
import { mount } from 'enzyme';
import BudgetTableColumn from '../BudgetTableColumn';
import { accounts } from '../mockData';
import { withProvider, testLoadingState } from '../../testHelpers/index';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const fixedDate = new Date('2018-06-10');

const ComponentWithFixedDate = withProvider(() => (
  <BudgetTableColumn date={fixedDate.toISOString()} accounts={accounts} />
));

describe('BudgetTableColumnHOC', () => {
  testLoadingState(<ComponentWithFixedDate mocks={[]} />);
  // testErrorUI(<ComponentWithFixedDate mocks={errorMocks} />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithFixedDate />);
    await wait();
    wrapper.update();
    expect(wrapper.find('BudgetTableColumn').prop('date')).toBe(fixedDate.toISOString());
    expect(wrapper.find('BudgetTableColumn').prop('budget')).toBeDefined();
  });

  it('should call upsert with params', async () => {
    const wrapper = mount(<ComponentWithFixedDate />);
    await wait();
    wrapper.update();
    const amountInput = wrapper.find('AmountInput').first();
    // amountInput.find('input').simulate('change', { target: { value: '1' } });
    amountInput.find('input').simulate('blur');
    await wait();
    wrapper.update();
  });
});
