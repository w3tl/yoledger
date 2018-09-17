import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function ProfileHeader({ signout }) {
  return (
    <Fragment>
      <Menu.Item name="profile" as={Link} to="/profile" />
      <Menu.Item name="signout" onClick={signout} />
    </Fragment>
  );
}

ProfileHeader.propTypes = {
  signout: PropTypes.func.isRequired,
};

function LoginBar({ signout, loggedIn }) {
  return (
    <Menu.Menu position="right">
      {loggedIn && <ProfileHeader signout={signout} />}
      {!loggedIn && (
        <Menu.Item as={Link} to="/signin" name="Sign-in" />)}
    </Menu.Menu>
  );
}

LoginBar.propTypes = {
  signout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default LoginBar;
