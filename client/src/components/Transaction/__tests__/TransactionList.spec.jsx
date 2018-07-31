import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TransactionList from '../TransactionList';
import TransactionListItem from '../TransactionListItem';
import transactions from '../mockData';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

configure({ adapter: new Adapter() });

describe('TransactionList', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TransactionList transactions={transactions} />,
    );
    expect(output).toMatchSnapshot();
    expect(output.find(TransactionListItem)).toHaveLength(transactions.length);
  });
});
