import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { AmountInput } from '../Elements';

class BudgetTableCell extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    amount: null,
    onUpdate: () => {},
  }

  state = { amount: this.props.amount }

  handleChange = ({ target }) => {
    this.setState({ amount: target.value });
  }

  handleSave = () => { // TODO: save only when changed
    const { amount } = this.state;
    if (amount) {
      const { onUpdate } = this.props;
      onUpdate({ amount });
    }
  }

  render() {
    const { amount } = this.state;
    return (
      <Table.Cell>
        <AmountInput
          transparent
          value={amount}
          onChange={this.handleChange}
          onBlur={this.handleSave}
        />
      </Table.Cell>
    );
  }
}

export default BudgetTableCell;
