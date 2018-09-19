import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesPage from './Categories';
import { TransactionPage } from './Transaction';
import { BudgetPage } from './Budget';
import AssetPage from './Asset';
import { LoginPage } from './Login';
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
              pathname: '/signin',
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

function Routes({ loggedIn, signin }) {
  return (
    <main>
      <Route exact path="/" component={() => <h1>Hello</h1>} />
      <Route path="/signin" component={() => <LoginPage signin={signin} />} />
      <ProtectedRoute path="/budgets" component={BudgetPage} loggedIn={loggedIn} />
      <ProtectedRoute path="/transactions" component={TransactionPage} loggedIn={loggedIn} />
      <ProtectedRoute path="/profile" component={ProfilePage} loggedIn={loggedIn} />
      <ProtectedRoute path="/categories" component={CategoriesPage} loggedIn={loggedIn} />
      <ProtectedRoute path="/assets" component={AssetPage} loggedIn={loggedIn} />
    </main>
  );
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signin: PropTypes.func.isRequired,
};

export default Routes;
