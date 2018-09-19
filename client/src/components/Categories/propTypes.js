import PropTypes from 'prop-types';

export const categoryPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

export const expensePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
});

export const incomePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  balance: PropTypes.number,
});

export const loadingPropType = PropTypes.shape({
  query: PropTypes.any,
  mutation: PropTypes.any,
});

export const errorPropType = PropTypes.shape({
  query: PropTypes.any,
  mutation: PropTypes.any,
});
