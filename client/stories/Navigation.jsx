/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Navigation from '../src/components/Navigation';

storiesOf('Menu', module)
  .add('default', () => <Navigation />);
