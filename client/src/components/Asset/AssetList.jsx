import React from 'react';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import AssetListItem from './AssetListItem';
import { assetPropType } from './propTypes';

function AssetList({ assets, match }) {
  return (
    <List>
      {assets.length === 0 && (
        <Header as="h2" disabled>Empty</Header>)}
      {assets.map(account => (
        <AssetListItem key={account.name} url={match.url} asset={account} />))}
    </List>
  );
}

AssetList.propTypes = {
  assets: PropTypes.arrayOf(assetPropType),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

AssetList.defaultProps = {
  match: {
    url: '',
  },
  assets: [],
};

export default AssetList;
