import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AssetForm from '../src/components/Asset/AssetForm';

const asset = {
  id: '1',
  name: 'Bank Card',
  balance: 0,
};

storiesOf('Asset/Form', module)
  .add('create', () => <AssetForm />)
  .add('edit', () => <AssetForm asset={asset} onSave={action('onSave')} />);
