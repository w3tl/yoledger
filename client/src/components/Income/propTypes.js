import PropTypes from 'prop-types';

export const incomePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
});
