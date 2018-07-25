import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src/components/Elements';

storiesOf('Elements/Button', module)
  .add('default', () => (
    <Button onClick={action('onClick')}>
      Click me!
    </Button>));
