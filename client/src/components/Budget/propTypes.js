import PropTypes from 'prop-types';

export const budgetPropType = PropTypes.shape({
  id: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.number,
  balance: PropTypes.number,
});

export const periodPropType = PropTypes.instanceOf(Date);
