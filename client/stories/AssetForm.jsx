import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AssetForm from '../src/components/AssetForm';

storiesOf('Asset/Form', module)
  .add('with value', () => <AssetForm balance={0} onSave={action('onSave')} />);
