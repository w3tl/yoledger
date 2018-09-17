import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'semantic-ui-react';
import RawBudgetTableCell from '../BudgetTableCell';

const BudgetTableCell = props => (
  <Table>
    <Table.Body>
      <Table.Row>
        <RawBudgetTableCell {...props} />
      </Table.Row>
    </Table.Body>
  </Table>
);

describe('BudgetTableCell', () => {
  it('should call update when blur', () => {
    const onUpdate = jest.fn();
    const output = mount(
      <BudgetTableCell onUpdate={onUpdate} amount={5} />,
    );
    output.find('AmountInput').simulate('blur');
    expect(onUpdate.mock.calls[0]).toMatchSnapshot();
  });
});
