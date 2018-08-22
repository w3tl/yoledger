import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { transactionPropType } from './propTypes';
import { Button } from '../Elements';
import TransactionForm from './TransactionFormHOC';

export function Item({ // eslint-disable-next-line react/prop-types
  source, destination, amount, date, onClick,
}) {
  return (
    <li style={{ display: 'flex' }}>
      <p><b>From:</b> {source.name}</p>
      <p><b>; To:</b> {destination.name}</p>
      <p><b>; Amount:</b> {amount} </p>
      <p><b>; {moment(new Date(date)).format('DD MMM YY')}</b></p>
      <Button onClick={onClick}>Edit</Button>
    </li>
  );
}

class TransactionListItem extends React.Component {
  static propTypes = {
    transaction: transactionPropType.isRequired,
  }

  state = {
    isEdit: false,
  }

  handleClick = () => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
  }

  render() {
    const { transaction, ...other } = this.props;
    const { isEdit } = this.state;

    if (isEdit) {
      return <TransactionForm onClose={this.handleClick} transaction={transaction} {...other} />;
    }

    return <Item onClick={this.handleClick} {...transaction} />;
  }
}

export default TransactionListItem;
