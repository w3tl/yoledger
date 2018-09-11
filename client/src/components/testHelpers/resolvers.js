import dateResolver from '../../../../server/src/graphql/date';
import assets from '../Asset/mockData';
import expenses from '../Expense/mockData';
import incomes from '../Income/mockData';
import { accounts, periods, budgets } from '../Budget/mockData';
import transactions from '../Transaction/mockData';

const accountsArray = assets.concat(expenses).concat(incomes);

export default {
  Date: dateResolver,
  Query: {
    account(root, { id }) {
      if (id === '666') return { name: 'new account' };
      return accountsArray.find(a => a.id === id);
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
    transactions() {
      return transactions.map(({ date, ...other }) => ({ date: new Date(date), ...other }));
    },
    transaction(root, { id }) {
      if (id === '666') return { name: 'new account' };
      const { date, ...other } = transactions.find(a => a.id === id);
      return { date: new Date(date), ...other };
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
    addTransaction(root, { input }) {
      return {
        transaction: {
          id: '666',
          ...input,
          source: accountsArray.find(a => a.name === input.source),
          destination: accountsArray.find(a => a.name === input.destination),
        },
      };
    },
    deleteTransaction(root, { id }) {
      return {
        success: true,
        id,
      };
    },
    updateTransaction(root, { id, input }) {
      return {
        transaction: {
          ...transactions.find(t => t.id === id),
          id: '11',
          ...input,
          source: accountsArray.find(a => a.name === input.source),
          destination: accountsArray.find(a => a.name === input.destination),
        },
      };
    },
    signin(root, { login }) {
      return {
        token: `{\\"userId\\":\\"${login}\\"};secret;{\\"expiresIn\\":10}`,
      };
    },
    signout() {
      return {
        success: true,
      };
    },
    changePassword() {
      return {
        token: `{\\"userId\\":\\"${'admin'}\\"};secret;{\\"expiresIn\\":10}`,
      };
    },
  },
};
