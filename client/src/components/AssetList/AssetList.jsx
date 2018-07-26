import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { accountPropType } from '../propTypes';
import withData from './AssetListHOC';

function AssetList({ assets, match }) {
  return (
    <ul>
      {assets.map(account => (
        <li key={account.name}>
          <Link to={`${match.url}/${account.id}`}>{account.name}</Link>
        </li>
      ))}
    </ul>
  );
}

AssetList.propTypes = {
  assets: PropTypes.arrayOf(accountPropType),
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

export default withData(AssetList);
