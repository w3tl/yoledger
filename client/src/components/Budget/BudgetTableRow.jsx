import React from 'react';
import PropTypes from 'prop-types';
import { Table, Loader, Header } from 'semantic-ui-react';
import BudgetTableCell from './BudgetTableCell';
import { accountPropType } from '../propTypes';
import { budgetPropType, periodPropType } from './propTypes';

function BudgetTableRow({
  account, loading, periods, budget, onUpdate,
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4">
          <Header.Content>
            {account.name}
            <Header.Subheader></Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      {loading && (
        <Table.Cell colSpan={periods.length}>
          <Loader active inline="centered" size="small" />
        </Table.Cell>)}
      {!loading && periods.map((date) => {
        const period = budget.find(b => new Date(b.date).getTime() === date.getTime())
          || { amount: 0 };
        return (
          <BudgetTableCell key={`${date}${account.name}`} amount={period.amount} onUpdate={onUpdate({ date, account: account.name })} />
        );
      })}
    </Table.Row>
  );
}

BudgetTableRow.propTypes = {
  account: accountPropType.isRequired,
  loading: PropTypes.bool,
  periods: PropTypes.arrayOf(periodPropType),
  budget: PropTypes.arrayOf(budgetPropType),
  onUpdate: PropTypes.func.isRequired,
};

BudgetTableRow.defaultProps = {
  loading: false,
  periods: [],
  budget: [],
};

export default BudgetTableRow;
