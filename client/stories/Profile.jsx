import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Profile from '../src/components/Profile/Profile';

const ComponentWithActions = props => (
  <Profile changePassword={action('changePassword')} {...props} />
);

storiesOf('Profile', module)
  .add('default', () => <ComponentWithActions />)
  .add('with same new password', () => <ComponentWithActions initialState={{ oldPassword: '1', newPassword: '1' }} />)
  .add('with wrong repeated password', () => <ComponentWithActions initialState={{ oldPassword: '1', newPassword: '2', repeatNewPassword: '3' }} />)
  .add('loading', () => <ComponentWithActions loading />)
  .add('with errors', () => <ComponentWithActions error={{ graphQLErrors: ['No user found!'] }} />);
