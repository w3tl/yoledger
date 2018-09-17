import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Navigation from '../src/components/Navigation';

storiesOf('Navigation', module)
  .add('sign in', () => <Navigation loggedIn signout={action('Signout')} />)
  .add('sign out', () => <Navigation loggedIn={false} />);
