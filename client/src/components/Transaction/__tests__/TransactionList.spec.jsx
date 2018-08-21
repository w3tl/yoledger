import React from 'react';
import { shallow } from 'enzyme';
import TransactionList from '../TransactionList';
import TransactionListItem from '../TransactionListItem';
import transactions from '../mockData';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('TransactionList', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TransactionList transactions={transactions} />,
    );
    expect(output).toMatchSnapshot();
    expect(output.find(TransactionListItem)).toHaveLength(transactions.length);
  });
});
