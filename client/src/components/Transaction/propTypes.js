import PropTypes from 'prop-types';
import { accountPropType } from '../propTypes';

export const transactionTypePropType = PropTypes.oneOf([
  'expense',
  'income',
]);

export const transactionPropType = PropTypes.shape({
  id: PropTypes.string,
  amount: PropTypes.number,
  source: accountPropType.isRequired,
  destination: accountPropType.isRequired,
  date: PropTypes.string.isRequired,
});
