import React from 'react';
import { mount } from 'enzyme';
import TransactionPage from '../TransactionPageHOC';
import {
  wait, withProvider, testLoadingState, stubDate,
} from '../../testHelpers/index';

const PageWithDayPeriod = withProvider(props => (
  <TransactionPage {...props} />));
const PageWithWeekPeriod = withProvider(props => (
  <TransactionPage {...props} />));

describe.skip('TransactionPageHOC', () => {
  stubDate('2018-01-01');

  it('should received settings', async () => {
    const wrapper = mount(<PageWithDayPeriod />);
    await wait();
    wrapper.update();
    expect(wrapper.find('TransactionPage').props()).toMatchSnapshot();
  });
});
