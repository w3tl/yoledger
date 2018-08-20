import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function IncomeMenu({ match: { url } }) {
  return (
    <div>
      <Link to={`${url}/create`}>Add</Link>
    </div>
  );
}

IncomeMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

IncomeMenu.defaultProps = {
  match: {
    url: null,
  },
};

export default IncomeMenu;
