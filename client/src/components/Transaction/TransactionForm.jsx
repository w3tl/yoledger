import React from 'react';
import PropTypes from 'prop-types';
import { Button, DateInput } from '../Elements';
import { AccountInput } from '../Account';
import AmountInput from '../AmountInput';
import TransactionTypeSelect from './TransactionTypeSelect';
import { transactionTypePropType, transactionPropType } from './propTypes';

class TransactionForm extends React.Component {
  static propTypes = {
    transaction: transactionPropType,
    type: transactionTypePropType,
    onCreate: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const { transaction, type } = props;
    this.state = {
      isCreate: !transaction.id,
      amount: transaction.amount,
      source: transaction.source.name,
      destination: transaction.destination.name,
      date: transaction.date,
      type,
    };
  }

  handleChange = name => ({ target }) => {
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      isCreate, amount, source, destination, date,
    } = this.state;
    const { transaction, onSave, onCreate } = this.props;
    if (isCreate) {
      onCreate({
        amount, source, destination, date,
      });
    } else {
      onSave(transaction.id, {
        amount, source, destination, date,
      });
    }
  }

  handleDelete = () => {
    const { onDelete } = this.props;
    onDelete();
  }

  handleTypeChange = ({ target }) => {
    this.setState({ type: target.value });
  }

  render() {
    const {
      amount, source, destination, date, type, isCreate,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TransactionTypeSelect value={type} onChange={this.handleTypeChange} />
        <AccountInput required label="From" value={source} onChange={this.handleChange('source')} />
        <AccountInput required label="To" value={destination} onChange={this.handleChange('destination')} />
        <AmountInput required label="Amount" value={amount} onChange={this.handleChange('amount')} />
        <DateInput label="When" value={date} onChange={this.handleChange('date')} />
        {!isCreate && <Button id="delete" onClick={this.handleDelete}>Delete</Button>}
        {source && destination && (
          <Button type="submit">
            Save
          </Button>)}
      </form>
    );
  }
}

TransactionForm.defaultProps = {
  transaction: {
    id: null,
    amount: 0,
    source: {
      name: '',
    },
    destination: {
      name: '',
    },
    date: new Date().toISOString(),
  },
  type: 'expense',
  onCreate: () => {},
  onSave: () => {},
  onDelete: () => {},
};

export default TransactionForm;
