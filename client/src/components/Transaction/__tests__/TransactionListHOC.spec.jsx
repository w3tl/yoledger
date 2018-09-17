import React from 'react';
import { mount } from 'enzyme';
import TransactionList from '../TransactionListHOC';
import transactions from '../mockData';
import { wait, withProvider, testLoadingState } from '../../testHelpers';

const date = new Date('2018-01-01');

const List = withProvider(() => <TransactionList dateStart={date.toISOString()} />);

describe('TransactionListHOC', () => {
  testLoadingState(<List />);

  it('should have transactions prop', async () => {
    const wrapper = mount(<List />);
    await wait();
    wrapper.update();
    expect(wrapper.find('TransactionList').prop('transactions')).toHaveLength(transactions.length);
  });
});
