import React from 'react';
import { mount } from 'enzyme';
import ExpenseListItem from '../ExpenseListItem';
import { testRenderWithoutError } from '../../testHelpers';
import expenses from '../mockData';

const expense = expenses[0];

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('ExpenseListItem', () => {
  testRenderWithoutError(<ExpenseListItem expense={expense} />);

  it('should render Link when run with router', () => {
    const output = mount( // COMBAK: Check link and do not render component
      <ExpenseListItem expense={expense} url="/home" />,
    );
    expect(output).toMatchSnapshot();
  });
});
