import React from 'react';
import { shallow } from 'enzyme';
import IncomeList from '../IncomeList';
import IncomeListItem from '../IncomeListItem';
import { testRenderWithoutError } from '../../testHelpers';
import incomes from '../mockData';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('IncomeList', () => {
  testRenderWithoutError(<IncomeList incomes={incomes} />);

  it('should contain IncomeListItem', () => {
    const output = shallow(
      <IncomeList incomes={incomes} />,
    );
    expect(output.find(IncomeListItem)).toHaveLength(incomes.length);
  });
});
