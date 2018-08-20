import dateResolver from '../../../../graphql/date';
import assets from '../Asset/mockData';
import { accounts, periods, budgets } from '../Budget/mockData';

export default {
  Date: dateResolver,
  Query: {
    account(root, { id }) {
      return assets.find(a => a.id === id);
    },
    accounts(root, { type }) {
      if (type === 'ASSET') return assets;
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
    upsertBudget() {
      return {
        success: true,
        allocation: {
          account: { id: '99', name: 'new account' },
        },
      };
    },
  },
};
