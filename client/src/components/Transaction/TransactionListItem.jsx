import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { List } from 'semantic-ui-react';
import { transactionPropType } from './propTypes';
import TransactionForm from './TransactionFormHOC';

export function Item({ // eslint-disable-next-line react/prop-types
  source, destination, amount, date,
}) {
  return (
    <React.Fragment>
      <List.Content floated="right">
        {amount}
      </List.Content>
      <List.Content>
        <List.Header>
          <b>{source.name}</b>
          {' to '}
          <b>{destination.name}</b>
        </List.Header>
        <List.Description>
          {moment(new Date(date)).format('DD MMM YY')}
        </List.Description>
      </List.Content>
    </React.Fragment>
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
      return (
        <List.Item>
          <TransactionForm onClose={this.handleClick} transaction={transaction} {...other} />
        </List.Item>);
    }

    return (
      <List.Item as="a" onClick={this.handleClick}>
        <Item onClick={this.handleClick} {...transaction} />
      </List.Item>);
  }
}

export default TransactionListItem;
