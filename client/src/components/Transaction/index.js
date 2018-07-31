import TransactionForm from './TransactionForm';
import transactionFormData from './TransactionFormHOC';
import TransactionList from './TransactionList';
import transactionListData from './TransactionListHOC';
import TransactionMenu from './TransactionMenu';
import propTypes from './propTypes';
import fragments from './fragments';

const TransactionFormWithData = transactionFormData(TransactionForm);
const TransactionListWithData = transactionListData(TransactionList);

export {
  propTypes,
  fragments,
  TransactionFormWithData as TransactionForm,
  TransactionListWithData as TransactionList,
  TransactionMenu,
};
