import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { assetPropType } from './propTypes';

function AssetListItem({ url, asset }) {
  const { id, name } = asset;
  return (
    <li key={name}>
      {url ? (
        <Link to={{ pathname: `${url}/view`, state: { id } }}>{name}</Link>
      ) : (
        name
      )}
    </li>
  );
}

AssetListItem.propTypes = {
  url: PropTypes.string,
  asset: assetPropType.isRequired,
};

AssetListItem.defaultProps = {
  url: null,
};

export default AssetListItem;
