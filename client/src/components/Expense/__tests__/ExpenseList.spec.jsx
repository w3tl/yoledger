import React from 'react';
import { shallow } from 'enzyme';
import ExpenseList from '../ExpenseList';
import ExpenseListItem from '../ExpenseListItem';
import { testRenderWithoutError } from '../../testHelpers';
import expenses from '../mockData';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('ExpenseList', () => {
  testRenderWithoutError(<ExpenseList expenses={expenses} />);

  it('should contain ExpenseListItem', () => {
    const output = shallow(
      <ExpenseList expenses={expenses} />,
    );
    expect(output.find(ExpenseListItem)).toHaveLength(expenses.length);
  });
});
