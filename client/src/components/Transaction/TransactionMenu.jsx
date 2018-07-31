import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TransactionMenu({ match: { url } }) {
  return (
    <div>
      <Link to={`${url}/create`}>Add</Link>
    </div>
  );
}

TransactionMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

TransactionMenu.defaultProps = {
  match: {
    url: null,
  },
};

export default TransactionMenu;
