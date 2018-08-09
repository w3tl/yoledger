import React from 'react';
import { mount } from 'enzyme';
import { QUERY } from '../BudgetTableHeaderHOC';
import BudgetTableHeader from '../BudgetTableHeader';
import { periods } from '../mockData';
import {
  withProvider, testLoadingState, testErrorUI, stubDate,
} from '../../testHelpers';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const fixedDate = new Date('2018-06-10');

const mock = {
  request: {
    query: QUERY,
    variables: { dateStart: fixedDate.toISOString(), count: 4 },
  },
  result: {
    data: { budgets: { periods } },
  },
};

const errorMocks = [{
  ...mock,
  error: new Error('awwh'),
}];

const ComponentWithFixedDate = withProvider(() => (
  <BudgetTableHeader dateStart={fixedDate.toISOString()} count={4} />
));

describe('BudgetTableHeaderHOC', () => {
  stubDate(fixedDate);

  testLoadingState(<ComponentWithFixedDate mocks={[]} />);
  testErrorUI(<ComponentWithFixedDate mocks={errorMocks} />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithFixedDate mocks={[mock]} addTypename={false} />);
    await wait();
    wrapper.update();
    expect(wrapper.find('BudgetTableHeader').prop('periods')).toHaveLength(periods.length);
  });
});
