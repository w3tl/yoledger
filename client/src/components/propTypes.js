import PropTypes from 'prop-types';

export const accountPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
});

export const errorPropType = PropTypes.shape({
  graphQLErrors: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        message: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  ),
});
