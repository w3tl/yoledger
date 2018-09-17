/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Table } from 'semantic-ui-react';
import { BudgetPage } from '../src/components/Budget';
import RawBudgetTable from '../src/components/Budget/BudgetTable';
import RawBudgetTableHeader from '../src/components/Budget/BudgetTableHeader';
import RawBudgetTableFooter from '../src/components/Budget/BudgetTableFooter';
import RawBudgetTableRow from '../src/components/Budget/BudgetTableRow';
import { accounts, budgets } from '../src/components/Budget/mockData';
import { getPeriods } from '../src/components/Budget/utils';

const periods = getPeriods('2018-06-10', 6, {
  type: 'dayOfMonth', options: [10, 25],
});

storiesOf('Budget/Page', module)
  .add('with budget', () => <BudgetPage initialState={{ periods }} />);

const Row = ({ periods: cols, account }) => (
  <Table.Row>
    <Table.Cell>{account.name}</Table.Cell>
    {cols.map(period => <Table.Cell key={period}>Cell</Table.Cell>)}
  </Table.Row>
);

const BudgetTable = props => (
  <RawBudgetTable periods={periods} accounts={accounts} {...props} />
);

storiesOf('Budget/Table', module)
  .add('default', () => <BudgetTable row={Row} />)
  .add('without accounts', () => <BudgetTable row={Row} accounts={[]} />)
  .add('loading', () => <BudgetTable row={Row} loading />);

const BudgetTableHeader = props => (
  <RawBudgetTableHeader periods={periods} onPeriodChange={action('onPeriodChange')} {...props} />
);

storiesOf('Budget/Table/Header', module)
  .addDecorator(story => (
    <Table fixed columns={periods.length + 1}>
      {story()}
    </Table>
  ))
  .add('default', () => <BudgetTableHeader />);

const BudgetTableFooter = props => (
  <RawBudgetTableFooter
    accounts={accounts}
    length={periods.length}
    onCreate={action('onCreate')}
    {...props}
  />
);

storiesOf('Budget/Table/Footer', module)
  .addDecorator(story => (
    <Table fixed columns={periods.length + 1}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{accounts[0].name}</Table.HeaderCell>
          <Table.HeaderCell>100</Table.HeaderCell>
          <Table.HeaderCell colSpan={periods.length - 1} />
        </Table.Row>
      </Table.Header>
      {story()}
    </Table>
  ))
  .add('default', () => <BudgetTableFooter />)
  .add('when click add', () => <BudgetTableFooter initialState={{ isAddAccount: true }} />)
  .add('when click add and enter new account', () => <BudgetTableFooter initialState={{ isAddAccount: true, newAccount: 'New account' }} />)
  .add('when click add and enter existing account', () => <BudgetTableFooter initialState={{ isAddAccount: true, newAccount: accounts[0].name }} />)
  .add('loading', () => <BudgetTableFooter loading />);

const BudgetTableRow = props => (
  <RawBudgetTableRow
    account={accounts[0]}
    periods={periods}
    budget={budgets.filter(b => b.account.name === accounts[0].name)}
    onUpdate={action('onUpdate')}
    {...props}
  />
);

storiesOf('Budget/Table/Row', module)
  .addDecorator(story => (
    <Table fixed columns={periods.length + 1}>
      <Table.Body>{story()}</Table.Body>
    </Table>
  ))
  .add('default', () => <BudgetTableRow />)
  .add('loading', () => <BudgetTableRow loading />);
