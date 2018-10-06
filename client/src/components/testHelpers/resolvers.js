import dateResolver from './date';
import assets from '../Asset/mockData';
import { expenses, incomes } from '../Categories/mockData';
import { accounts, budgets as rawBudgets } from '../Budget/mockData';
import transactions from '../Transaction/mockData';

const accountsArray = assets.concat(expenses).concat(incomes);
const budgets = rawBudgets.map(({ date, ...fields }) => ({ date: new Date(date), ...fields }));

export default {
  Date: dateResolver,
  Query: {
    account(root, { id }) {
      if (id === '666') return { name: 'new account' };
      return accountsArray.find(a => a.id === id);
    },
    accounts(root, { type }) {
      return accountsArray.filter(a => a.type === type);
    },
    budgets() {
      return { accounts };
    },
    budget(root, { account, dateStart, dateEnd }) {
      return budgets // eslint-disable-next-line max-len
        .filter(b => (
          b.account.name === account
          && b.date.getTime() >= dateStart.getTime()
          && b.date.getTime() <= new Date(dateEnd).getTime()));
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
    upsertBudget(root, { input: { account, date, amount } }) {
      const existingBudget = budgets
        .find(b => (
          b.account.name === account.name && b.date.getTime() === new Date(date).getTime()
        ));
      const acc = accounts.find(a => a.name === account) || {
        id: '687',
        name: account,
      };
      return {
        success: true,
        budget: {
          id: '99',
          ...existingBudget,
          account: acc,
          date,
          amount,
        },
      };
    },
    addAccount(root, { input }) {
      return {
        account: { id: '666', ...input },
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
          id: '888',
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
