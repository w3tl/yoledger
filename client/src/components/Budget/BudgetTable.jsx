import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { accountPropType } from '../propTypes';
import { periodPropType } from './propTypes';
import BudgetTableRow from './BudgetTableRowHOC';
import BudgetTableHeader from './BudgetTableHeader';
import BudgetTableFooter from './BudgetTableFooter';

class BudgetTable extends React.Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(accountPropType),
    periods: PropTypes.arrayOf(periodPropType),
    loading: PropTypes.bool,
    onCreate: PropTypes.func,
    onPeriodChange: PropTypes.func,
    row: PropTypes.func,
  }

  static defaultProps = {
    accounts: [],
    periods: [],
    loading: false,
    onCreate: () => {},
    onPeriodChange: () => {},
    row: BudgetTableRow,
  }

  handleCreate = ({ account }) => {
    const { onCreate, periods } = this.props;
    return onCreate({
      variables: { input: { date: periods[0].toISOString(), account, amount: 0 } },
    });
  }

  render() {
    const {
      accounts, periods, onPeriodChange, loading, row: Row,
    } = this.props;
    return (
      <Table fixed basic="very" striped columns={periods.length + 1}>
        <BudgetTableHeader periods={periods} onPeriodChange={onPeriodChange} />
        <Table.Body>
          {accounts.map(account => (
            <Row
              key={account.name}
              account={account}
              dateStart={periods[0].toISOString()}
              dateEnd={periods[periods.length - 1].toISOString()}
              {...this.props}
            />
          ))}
        </Table.Body>
        {periods.length > 0 && (
          <BudgetTableFooter
            accounts={accounts}
            length={periods.length}
            loading={loading}
            onCreate={this.handleCreate}
          />)}
      </Table>
    );
  }
}

export default BudgetTable;
