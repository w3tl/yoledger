/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Profile from '../src/components/Profile/Profile';

const ComponentWithActions = props => (
  <Profile changePassword={action('changePassword')} {...props} />
);

storiesOf('Profile', module)
  .add('default', () => <ComponentWithActions />);
