/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoginBar from '../src/components/Login/LoginBar';

const ComponentWithActions = props => (
  <LoginBar signin={action('signin')} signout={action('signout')} {...props} />
);

storiesOf('LoginBar', module)
  .add('logged in', () => <ComponentWithActions loggedIn />)
  .add('logged out', () => <ComponentWithActions loggedIn={false} />);
