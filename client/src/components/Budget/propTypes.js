import PropTypes from 'prop-types';
import { accountPropType } from '../propTypes';

export const allocationPropType = PropTypes.shape({
  date: PropTypes.string,
  amount: PropTypes.number,
  balance: PropTypes.number,
});

export const budgetPropType = PropTypes.shape({
  account: accountPropType.isRequired,
  allocations: PropTypes.arrayOf(allocationPropType),
});
