import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Elements';
import Login from './Login';

function ProfileHeader({ signout }) {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <Button onClick={signout}>Signout</Button>
    </div>
  );
}

ProfileHeader.propTypes = {
  signout: PropTypes.func.isRequired,
};

function LoginBar({ signin, signout, loggedIn }) {
  return (
    <div>
      {loggedIn && <ProfileHeader signout={signout} />}
      {!loggedIn && <Login signin={signin} />}
    </div>
  );
}

LoginBar.propTypes = {
  signout: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default LoginBar;
