jest.mock('mongodb');

import { dataloaders } from '../../index';
import {
  Query, Mutation, BudgetPlan,
} from '../resolver';
import { Account, Budget as BudgetModel } from '../../../model';

describe('budget resolver', () => {
  const { connection } = require('mongodb');
  const context = {
    dataloaders: dataloaders(connection),
    models: {
      budgetModel: new BudgetModel(connection.db(), 'admin'),
      accountModel: new Account(connection.db(), 'admin'),
    },
    userId: 'admin',
  };

  describe('BudgetPlan', () => {
    test('budget', async () => {
      const accounts = [
        { _id: '3', name: 'Food', type: 'EXPENSE' },
        { _id: '4', name: 'Train', type: 'EXPENSE' },
      ];
      const periods = [new Date('2018-05-10'), new Date('2018-05-25')];
      const result = await BudgetPlan.budget({ periods, accounts }, null, context);
      expect(result).toMatchSnapshot();
    });
  });

  test('Query should return periods and accounts', async () => {
    const date = new Date('2018-05-10');
    const result = await Query.budgets(null, {
      dateStart: date,
      count: 4,
    }, context);
    expect(result).toMatchSnapshot();
  });

  test('Query should throw error when count more than 20', async () => {
    const date = new Date('2018-05-10');
    const query = Query.budgets(null, {
      dateStart: date,
      count: 21,
    }, context);
    await expect(query)
      .rejects
      .toThrowError(/long/);
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
