import React from 'react';
import { mount } from 'enzyme';
import IncomeListItem from '../IncomeListItem';
import { testRenderWithoutError } from '../../testHelpers';
import incomes from '../mockData';

const income = incomes[0];

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('IncomeListItem', () => {
  testRenderWithoutError(<IncomeListItem income={income} />);

  it('should render Link when run with router', () => {
    const output = mount( // COMBAK: Check link and do not render component
      <IncomeListItem income={income} url="/home" />,
    );
    expect(output).toMatchSnapshot();
  });
});
