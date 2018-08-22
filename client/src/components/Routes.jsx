import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { shouldHaveId } from './utils';
import { AssetForm, AssetList, AssetMenu } from './Asset';
import { ExpenseForm, ExpenseList, ExpenseMenu } from './Expense';
import { IncomeForm, IncomeList, IncomeMenu } from './Income';
import { TransactionPage } from './Transaction';
import { BudgetTable } from './Budget';

const Assets = () => (
  <Switch>
    <Route exact path="/assets" component={AssetList} />
    <Route path="/assets/create" component={AssetForm} />
    <Route path="/assets/view" component={shouldHaveId(AssetForm, '/assets')} />
  </Switch>
);

const Expenses = () => (
  <Switch>
    <Route exact path="/expenses" component={ExpenseList} />
    <Route path="/expenses/create" component={ExpenseForm} />
    <Route path="/expenses/view" component={shouldHaveId(ExpenseForm, '/expenses')} />
  </Switch>
);

const Incomes = () => (
  <Switch>
    <Route exact path="/incomes" component={IncomeList} />
    <Route path="/incomes/create" component={IncomeForm} />
    <Route path="/incomes/view" component={shouldHaveId(IncomeForm, '/incomes')} />
  </Switch>
);

function Routes() {
  return (
    <main>
      <div>
        <Route path="/assets" component={AssetMenu} />
        <Route path="/expenses" component={ExpenseMenu} />
        <Route path="/incomes" component={IncomeMenu} />
      </div>
      <Route path="/budgets" component={BudgetTable} />
      <Route exact path="/transactions" component={TransactionPage} />
      <Assets />
      <Expenses />
      <Incomes />
    </main>
  );
}

export default Routes;
