jest.mock('mongodb');

import { dataloaders } from '../../index';
import {
  Query, Mutation, Budget,
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

  describe('Budget', () => {
    test('accounts', async () => {
      const periods = [new Date('2018-05-10'), new Date('2018-05-25')];
      const result = await Budget.accounts({ periods }, null, context);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Query', () => {
    test('bugdets should return periods', async () => {
      const date = new Date('2018-05-10');
      const result = await Query.budgets(null, {
        dateStart: date,
        count: 4,
      }, context);
      expect(result).toMatchSnapshot();
    });

    test('budgets should throw error when count more than 20', async () => {
      const date = new Date('2018-05-10');
      const query = Query.budgets(null, {
        dateStart: date,
        count: 21,
      }, context);
      await expect(query)
        .rejects
        .toThrowError(/long/);
    });

    test('budget should return allocation', async () => {
      const date = new Date('2018-05-10');
      const result = await Query.budgets(null, { date }, context);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Mutation', () => {
    test('upsertBudget', async () => {
      const result = await Mutation.upsertBudget(null, {
        input: {
          account: 'Food',
          date: new Date('2018-05-10'),
          amount: 564,
        },
      }, context);
      expect(result).toMatchSnapshot();
    });
  });
});
