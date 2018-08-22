import React from 'react';
import { shallow } from 'enzyme';
import TransactionList from '../TransactionList';
import TransactionListItem from '../TransactionListItem';
import transactions from '../mockData';

describe('TransactionList', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TransactionList transactions={transactions} />,
    );
    expect(output).toMatchSnapshot();
    expect(output.find(TransactionListItem)).toHaveLength(transactions.length);
  });
});
