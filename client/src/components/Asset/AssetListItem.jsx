import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { assetPropType } from './propTypes';

function AssetListItem({ url, asset }) {
  const { id, name } = asset;
  return (
    <List.Item>
      <List.Icon name="credit card" />
      <List.Content verticalAlign="bottom">
        <Link to={{ pathname: `${url}/view`, state: { id } }}>{name}</Link>
      </List.Content>
    </List.Item>
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
