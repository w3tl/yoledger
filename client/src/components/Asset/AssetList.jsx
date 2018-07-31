import React from 'react';
import PropTypes from 'prop-types';
import AssetListItem from './AssetListItem';
import { assetPropType } from './propTypes';

function AssetList({ assets, match }) {
  return (
    <ul>
      {assets.map(account => (
        <AssetListItem key={account.name} url={match.url} asset={account} />))}
    </ul>
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
