import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RawAssetPage from '../src/components/Asset/AssetPage';
import AssetForm from '../src/components/Asset/AssetForm';
import assets from '../src/components/Asset/mockData';

const AssetPage = props => (
  <RawAssetPage
    assets={assets}
    onCreate={action('onCreate')}
    formComponent={AssetForm}
    {...props}
  />);

const error = { graphQLErrors: [{ message: 'Account already exists!' }] };

storiesOf('Assets/Page', module)
  .add('default', () => <AssetPage />)
  .add('empty', () => <AssetPage assets={[]} />)
  .add('loading', () => <AssetPage loading />)
  .add('with error', () => <AssetPage error={error} />)
  .add('while adding new asset', () => <AssetPage initialState={{ activeItem: '-1' }} />)
  .add('with active asset', () => <AssetPage initialState={{ activeItem: assets[0].id }} />);

storiesOf('Assets/Form', module)
  .add('default', () => <AssetForm onCreate={action('onCreate')} />)
  .add('loading', () => <AssetForm loading />)
  .add('with error', () => <AssetForm error={error} />)
  .add('with asset', () => <AssetForm asset={assets[0]} onCreate={action('onCreate')} />);
