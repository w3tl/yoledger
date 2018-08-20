import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import listWithData from './ExpenseListHOC';
import formWithData from './ExpenseFormHOC';
import ExpenseMenu from './ExpenseMenu';
import propTypes from './propTypes';
import fragments from './fragments';

const ExpenseListWithData = listWithData(ExpenseList);
const FormWithData = formWithData(ExpenseForm);

export {
  propTypes,
  fragments,
  FormWithData as ExpenseForm,
  ExpenseListWithData as ExpenseList,
  ExpenseMenu,
};
