/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from '../src/components/Header';

storiesOf('Header', module)
  .add('default', () => <Header />);
