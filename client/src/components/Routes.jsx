import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { shouldHaveId } from './utils';
import { AssetForm, AssetList, AssetMenu } from './Asset';
import { ExpenseForm, ExpenseList, ExpenseMenu } from './Expense';
import { IncomeForm, IncomeList, IncomeMenu } from './Income';
import { TransactionPage } from './Transaction';
import { BudgetTable } from './Budget';
import ProfilePage from './Profile';

function ProtectedRoute({
  component: Comp, loggedIn, path, ...rest
}) {
  return (
    <Route
      path={path}
      {...rest}
      render={props => (
        loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                prevLocation: path,
              },
            }}
          />
        )
      )}
    />
  );
}

function Routes({ loggedIn }) {
  return (
    <main>
      <div>
        <Route path="/assets" component={AssetMenu} />
        <Route path="/expenses" component={ExpenseMenu} />
        <Route path="/incomes" component={IncomeMenu} />
      </div>
      <Route exact path="/" component={() => <h1>Hello</h1>} />
      <ProtectedRoute path="/budgets" component={BudgetTable} loggedIn={loggedIn} />
      <ProtectedRoute path="/transactions" component={TransactionPage} loggedIn={loggedIn} />
      <ProtectedRoute path="/profile" component={ProfilePage} loggedIn={loggedIn} />
      <Switch>
        <ProtectedRoute path="/assets" component={AssetList} loggedIn={loggedIn} />
        <Route path="/assets/create" component={AssetForm} />
        <Route path="/assets/view" component={shouldHaveId(AssetForm, '/assets')} />
      </Switch>
      <Switch>
        <ProtectedRoute path="/expenses" component={ExpenseList} loggedIn={loggedIn} />
        <Route path="/expenses/create" component={ExpenseForm} />
        <Route path="/expenses/view" component={shouldHaveId(ExpenseForm, '/expenses')} />
      </Switch>
      <Switch>
        <ProtectedRoute path="/incomes" component={IncomeList} loggedIn={loggedIn} />
        <Route path="/incomes/create" component={IncomeForm} />
        <Route path="/incomes/view" component={shouldHaveId(IncomeForm, '/incomes')} />
      </Switch>
    </main>
  );
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Routes;
