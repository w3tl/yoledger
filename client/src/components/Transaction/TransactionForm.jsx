import React from 'react';
import PropTypes from 'prop-types';
import { Button, DateInput } from '../Elements';
import { AccountInput } from '../Account';
import AmountInput from '../AmountInput';
import TransactionTypeSelect from './TransactionTypeSelect';
import { accountPropType } from '../propTypes';

class TransactionForm extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
    source: accountPropType,
    destination: accountPropType,
    date: PropTypes.string,
    onSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
      source: props.source.name,
      destination: props.destination.name,
      date: props.date,
      type: 'expense',
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
      amount, source, destination, date,
    } = this.state;
    const { onSave } = this.props;
    onSave({
      amount, source, destination, date,
    });
  }

  handleTypeChange = ({ target }) => {
    this.setState({ type: target.value });
  }

  render() {
    const {
      amount, source, destination, date, type,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TransactionTypeSelect value={type} onChange={this.handleTypeChange} />
        <AccountInput required label="From" value={source} onChange={this.handleChange('source')} />
        <AccountInput required label="To" value={destination} onChange={this.handleChange('destination')} />
        <AmountInput required label="Amount" value={amount} onChange={this.handleChange('amount')} />
        <DateInput label="When" value={date} onChange={this.handleChange('date')} />
        <Button type="submit">
          Save
        </Button>
      </form>
    );
  }
}

TransactionForm.defaultProps = {
  amount: null,
  source: {
    name: '',
  },
  destination: {
    name: '',
  },
  date: new Date().toString(),
};

export default TransactionForm;
