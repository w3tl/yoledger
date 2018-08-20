import dateResolver from '../../../../graphql/date';
import assets from '../Asset/mockData';
import expenses from '../Expense/mockData';
import incomes from '../Income/mockData';
import { accounts, periods, budgets } from '../Budget/mockData';

export default {
  Date: dateResolver,
  Query: {
    account(root, { id }) {
      if (id === '666') return { name: 'new account' };
      return assets.concat(expenses).concat(incomes).find(a => a.id === id);
    },
    accounts(root, { type }) {
      if (type === 'ASSET') return assets;
      if (type === 'EXPENSE') return expenses;
      if (type === 'INCOME') return incomes;
      return [];
    },
    budgets() {
      return { accounts, periods: periods.map(dateStr => new Date(dateStr)) };
    },
    budget() {
      return budgets[0];
    },
  },
  Mutation: {
    upsertBudget(root, { input: { date } }) {
      return {
        success: true,
        allocation: {
          id: date.toISOString().concat('new account'),
          account: { id: '99', name: 'new account' },
        },
      };
    },
    addAccount(root, { input }) {
      return {
        account: { id: '666', name: input.name },
      };
    },
  },
};
