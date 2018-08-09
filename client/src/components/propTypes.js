import PropTypes from 'prop-types';

export const accountPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
});
