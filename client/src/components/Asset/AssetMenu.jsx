import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AssetMenu({ match: { url } }) {
  return (
    <div>
      <Link to={`${url}/create`}>Add</Link>
    </div>
  );
}

AssetMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

AssetMenu.defaultProps = {
  match: {
    url: null,
  },
};

export default AssetMenu;
