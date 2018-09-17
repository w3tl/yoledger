import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'semantic-ui-react';
import RawBudgetTableFooter from '../BudgetTableFooter';

const BudgetTableFooter = props => (
  <Table>
    <RawBudgetTableFooter
      accounts={[]}
      {...props}
    />
  </Table>
);

describe('BudgetTableFooter', () => {
  it('should call onCreate add button was clicked', () => {
    const onCreate = jest.fn();
    const output = mount(
      <BudgetTableFooter onCreate={onCreate} initialState={{ isAddAccount: true, newAccount: 'New account' }} />,
    );
    output.find('Button[id="addAccount"]').simulate('click');
    expect(onCreate.mock.calls[0]).toMatchSnapshot('');
  });
});
