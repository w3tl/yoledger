import PropTypes from 'prop-types';

export const expensePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
});
