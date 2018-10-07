import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { assetPropType } from './propTypes';

function AssetListItem({ asset, onClick }) {
  return (
    <List.Item as="a" onClick={onClick}>
      <List.Icon name="credit card" />
      <List.Content verticalAlign="bottom">{asset.name}</List.Content>
    </List.Item>
  );
}

AssetListItem.propTypes = {
  asset: assetPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

AssetListItem.defaultProps = {};

export default AssetListItem;
