jest.mock('mongodb');

import { dataloaders } from '../../index';
import {
  Query, Mutation, Budget, BudgetPlan,
} from '../resolver';
import { Budget as Budgets } from '../../../model';

describe('budget resolver', () => {
  const { connection } = require('mongodb');
  const context = {
    dataloaders: dataloaders(connection), models: { budgetModel: new Budgets(connection.db(), 'admin') },
  };

  test('Budget', async () => {
    const result = await Budget.account({ _id: { account: 'asset' } }, null, context);
    expect(result).toMatchSnapshot('account');
  });

  test('BudgetPlan', async () => {
    const result = await BudgetPlan.accounts({ periods: [] }, null, context);
    expect(result).toMatchSnapshot();
  });

  test('Query', async () => {
    const date = new Date('2018-05-10');
    const plan = await Query.budgets(null, {
      dateStart: date,
      count: 3,
    }, context);
    expect(plan).toMatchSnapshot('plan with 3 periods and accounts');
  });

  describe('Mutation', () => {
    test('upsertBudget', async () => {
      const result = await Mutation.upsertBudget(null, {
        input: {
          account: 'Food',
          date: '2018-05-10',
          amount: 564,
        },
      }, context);
      expect(result).toMatchSnapshot();
    });
  });
});
