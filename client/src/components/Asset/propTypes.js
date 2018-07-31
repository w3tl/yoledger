import PropTypes from 'prop-types';

export const assetPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
});
