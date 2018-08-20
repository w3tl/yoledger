import PropTypes from 'prop-types';
import { accountPropType } from '../propTypes';

export const budgetPropType = PropTypes.shape({
  account: accountPropType,
  amount: PropTypes.number,
  balance: PropTypes.number,
});
