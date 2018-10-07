import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import {
  Form, DateInput, AmountInput, AccountInput,
} from '../Elements';
import TransactionTypeSelect from './TransactionTypeSelect';
import { transactionTypePropType, transactionPropType } from './propTypes';

class TransactionForm extends React.Component {
  static propTypes = {
    transaction: transactionPropType,
    type: transactionTypePropType,
    loading: PropTypes.bool,
    onClose: PropTypes.func, // eslint-disable-line react/require-default-props
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

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      isCreate, amount, source, destination, date,
    } = this.state;
    const input = {
      amount, source, destination, date,
    };
    const { transaction, onSave, onCreate } = this.props;
    if (isCreate) {
      onCreate({ variables: { input } });
    } else {
      onSave({ variables: { id: transaction.id, input } });
    }
  }

  handleDelete = (e) => {
    e.preventDefault();
    const { onDelete, transaction } = this.props;
    onDelete({ variables: { id: transaction.id } });
  }

  render() {
    const { onClose, loading, ...props } = this.props;
    const {
      amount, source, destination, date, type, isCreate,
    } = this.state;
    const canSave = source.length > 0 && destination.length > 0;

    return (
      <Segment size="small" secondary loading={loading}>
        <Form onSubmit={this.handleSubmit} {...props}>
          <TransactionTypeSelect name="type" value={type} onChange={this.handleChange} />
          <Form.Group widths="equal">
            <Form.Field control={AccountInput} name="source" label="From" value={source} onChange={this.handleChange} />
            <Form.Field control={AccountInput} name="destination" label="To" value={destination} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline>
            <Form.Field control={AmountInput} name="amount" label="Amount" value={amount} onChange={this.handleChange} />
            <DateInput name="date" dateFormat="YYYY-MM-DD" label="When" value={date} onChange={this.handleChange} />
            {onClose && <Button onClick={onClose}>Cancel</Button>}
            {!isCreate && <Button id="delete" onClick={this.handleDelete}>Delete</Button>}
            <Button type="submit" primary disabled={!canSave}>Save</Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

TransactionForm.defaultProps = {
  transaction: {
    id: null,
    amount: 0,
    source: { name: '' },
    destination: { name: '' },
    date: new Date().toISOString(),
  },
  type: 'expense',
  loading: false,
  onCreate: () => {},
  onSave: () => {},
  onDelete: () => {},
};

export default TransactionForm;
