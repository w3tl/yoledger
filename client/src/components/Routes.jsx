import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AssetForm, AssetList, AssetMenu } from './Asset';
import { TransactionForm, TransactionList, TransactionMenu } from './Transaction';
import { BudgetTable } from './Budget';

const Assets = () => (
  <Switch>
    <Route exact path="/assets" component={AssetList} />
    <Route path="/assets/create" component={AssetForm} />
    <Route path="/assets/view" component={AssetForm} />
  </Switch>
);

const Transactions = () => (
  <Switch>
    <Route exact path="/transactions" component={TransactionList} />
    <Route path="/transactions/create" component={TransactionForm} />
    <Route path="/transactions/view" component={TransactionForm} />
  </Switch>
);

function Routes() {
  return (
    <main>
      <div>
        <Route path="/assets" component={AssetMenu} />
        <Route path="/transactions" component={TransactionMenu} />
      </div>
      <Route path="/budgets" component={BudgetTable} />
      <Assets />
      <Transactions />
    </main>
  );
}

export default Routes;
