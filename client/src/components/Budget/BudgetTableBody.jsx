import React from 'react';
import PropTypes from 'prop-types';
import BudgetTableRow from './BudgetTableRow';
import { budgetPropType } from './propTypes';
import withData from './BudgetTableBodyHOC';

class BudgetTableBody extends React.Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(budgetPropType),
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    accounts: [],
    onUpdate: () => {},
  }

  handleChange = account => ({ date, amount }) => {
    const { onUpdate } = this.props;
    const input = { account, date, amount };
    onUpdate({ variables: { input } });
  }

  render() {
    const { accounts } = this.props;
    return (
      <div>
        {accounts.map(budget => (
          <BudgetTableRow
            key={budget.account.name}
            onChange={this.handleChange(budget.account.name)}
            budget={budget}
          />
        ))}
      </div>
    );
  }
}

export { BudgetTableBody as BudgetTableBodyComponent };
export default withData(BudgetTableBody);
