import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form } from 'semantic-ui-react';
import RawTransactionForm from '../src/components/Transaction/TransactionForm';
import TransactionList from '../src/components/Transaction/TransactionList';
import TransactionPage from '../src/components/Transaction/TransactionPage';
import TransactionTypeSelect from '../src/components/Transaction/TransactionTypeSelect';
import transactions from '../src/components/Transaction/mockData';

const transaction = {
  id: null,
  amount: 0,
  source: { name: '' },
  destination: { name: '' },
  date: '2018-01-01',
};

const TransactionForm = props => (
  <RawTransactionForm
    transaction={transaction}
    onSave={action('submit')}
    onDelete={action('delete')}
    onCancel={action('cancel')}
    {...props}
  />
);

storiesOf('Transaction/Form', module)
  .add('creating new', () => <TransactionForm />)
  .add('filled', () => <TransactionForm transaction={{ ...transactions[0], id: null }} />)
  .add('editing', () => <TransactionForm transaction={transactions[0]} />)
  .add('loading', () => <TransactionForm loading />)
  .add('with errors', () => <TransactionForm error={{ graphQLErrors: [{ message: 'Wrong account name!' }] }} />);

storiesOf('Transaction/List', module)
  .add('with data', () => <TransactionList transactions={transactions} />)
  .add('empty list', () => <TransactionList />)
  .add('loading', () => <TransactionList loading />);

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: props.period,
    };
  }

  handleChange = ({ variables }) => {
    this.setState({ period: variables.period });
  }

  render() {
    const { period } = this.state;
    return (
      <TransactionPage onChangePeriod={this.handleChange} {...this.props} period={period} />
    );
  }
}

storiesOf('Transaction/Page', module)
  .add('default', () => <Page date="2018-10-01" period="DAY" />);

storiesOf('Transaction/TypeSelect', module)
  .addDecorator(story => <Form>{story()}</Form>)
  .add('default', () => <TransactionTypeSelect />)
  .add('with value', () => <TransactionTypeSelect value="income" onChange={action('Value changed')} />);
