import PropTypes from 'prop-types';

export const accountPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
});

export const periodPropType = PropTypes.shape({
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string,
});

export const budgetPropType = PropTypes.shape({
  period: periodPropType.isRequired,
  amount: PropTypes.number,
});
