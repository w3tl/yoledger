import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Menu } from 'semantic-ui-react';
import LoginPage from '../src/components/Login/LoginPage';
import LoginBar from '../src/components/Login/LoginBar';

const LoginBarWithActions = props => (
  <LoginBar signout={action('signout')} {...props} />
);

const LoginPageWithActions = props => (
  <LoginPage signin={action('signin')} {...props} />
);

storiesOf('Login/Bar', module)
  .addDecorator(story => <Menu>{story()}</Menu>)
  .add('logged in', () => <LoginBarWithActions loggedIn />)
  .add('logged out', () => <LoginBarWithActions loggedIn={false} />);

storiesOf('Login/Page', module)
  .add('default', () => <LoginPageWithActions />)
  .add('filled', () => <LoginPageWithActions initialState={{ username: 'admin', password: 'password' }} />)
  .add('loading', () => <LoginPageWithActions loading />)
  .add('with error', () => <LoginPageWithActions error={{ graphQLErrors: [{ message: 'No user found!' }] }} />);
