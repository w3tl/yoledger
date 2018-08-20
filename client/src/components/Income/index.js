import IncomeList from './IncomeList';
import IncomeForm from './IncomeForm';
import listWithData from './IncomeListHOC';
import formWithData from './IncomeFormHOC';
import IncomeMenu from './IncomeMenu';
import propTypes from './propTypes';
import fragments from './fragments';

const IncomeFormWithData = formWithData(IncomeForm);
const IncomeListWithData = listWithData(IncomeList);

export {
  propTypes,
  fragments,
  IncomeFormWithData as IncomeForm,
  IncomeListWithData as IncomeList,
  IncomeMenu,
};
