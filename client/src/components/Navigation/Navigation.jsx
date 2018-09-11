import React from 'react';
import { Link } from 'react-router-dom';
import LoginBar from '../Login';

function Navigation(props) {
  return (
    <nav>
      <LoginBar {...props} />
      <ul>
        <li>
          <Link to="/assets">Assets</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/incomes">Incomes</Link>
        </li>
        <li>
          <Link to="/budgets">Budgets</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {};

export default Navigation;
