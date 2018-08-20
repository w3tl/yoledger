import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ExpenseMenu({ match: { url } }) {
  return (
    <div>
      <Link to={`${url}/create`}>Add</Link>
    </div>
  );
}

ExpenseMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

ExpenseMenu.defaultProps = {
  match: {
    url: null,
  },
};

export default ExpenseMenu;
