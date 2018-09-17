import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import { LoginBar } from '../Login';

function Navigation(props) {
  return (
    <Menu>
      <Menu.Item as={Link} to="/" name="Yoledger!" />
      <Menu.Item as={Link} to="/assets" name="Assets" />
      <Dropdown text="Categories" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/expenses">Expenses</Dropdown.Item>
          <Dropdown.Item as={Link} to="/incomes">Incomes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item as={Link} to="/budgets" name="Budget" />
      <Menu.Item as={Link} to="/transactions" name="Transactions" />
      <LoginBar {...props} />
    </Menu>
  );
}

Navigation.propTypes = {};

export default Navigation;
