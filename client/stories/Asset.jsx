import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AssetForm from '../src/components/Asset/AssetForm';
import AssetList from '../src/components/Asset/AssetList';
import assets from '../src/components/Asset/mockData';

storiesOf('Asset/Form', module)
  .add('creating new', () => <AssetForm onSave={action('onSave')} />)
  .add('filled', () => <AssetForm asset={{ ...assets[0], id: null }} />)
  .add('editing', () => <AssetForm onSave={action('onSave')} asset={assets[0]} />)
  .add('loading', () => <AssetForm loading />)
  .add('with errors', () => <AssetForm error={{ graphQLErrors: ['Wrong account name!'] }} />);

storiesOf('Asset/List', module)
  .add('with data', () => <AssetList assets={assets} />)
  .add('empty list', () => <AssetList />);
