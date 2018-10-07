import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { LoginBar } from '../Login';

function Navigation(props) {
  return (
    <Menu>
      <Menu.Item as={Link} to="/" name="Yoledger!" />
      <Menu.Item as={Link} to="/assets" name="Assets" />
      <Menu.Item as={Link} to="/categories" name="Categories" />
      <Menu.Item as={Link} to="/budgets" name="Budget" />
      <Menu.Item as={Link} to="/transactions" name="Transactions" />
      <LoginBar {...props} />
    </Menu>
  );
}

Navigation.propTypes = {};

export default Navigation;
