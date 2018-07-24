jest.mock('mongodb');

import { dataloaders } from '../../index';
import { Query, Mutation, Budget } from '../resolver';

const userId = 'admin';

describe('budget resolver', () => {
  const { connection } = require('mongodb');
  const context = {
    dataloaders: dataloaders(connection), userId: 'admin', connection,
  };

  test('Budget', async () => {
    expect(Budget.id({ _id: 1 })).toBe(1);

    const result = await Budget.account({ source: { name: 'asset' } }, null, { dataloaders: dataloaders(connection), userId });
    expect(result).toMatchSnapshot('account');
  });

  test('Query', async () => {
    const result = await Query.budget(null, {
      dateStart: new Date('2018-05-10'),
      dateEnd: new Date('2018-05-20'),
      account: 'Food',
    }, context);
    expect(result).toMatchSnapshot('budget');
  });

  describe('Mutation', () => {
    test('addBudget', async () => {
      const result = await Mutation.addBudget(null, {
        input: {
          account: 'Food',
          date: '2018-05-10',
          amount: 564,
        },
      }, context);
      expect(result).toMatchSnapshot();
    });

    test('updateBudget', async () => {
      const result = await Mutation.updateBudget(null, {
        id: '2',
        input: {
          amount: 104,
        },
      }, context);
      expect(result).toMatchSnapshot();
    });

    test('deleteBudget', async () => {
      const result = await Mutation.deleteBudget(null, { id: '1' }, context);
      expect(result).toMatchSnapshot();
    });
  });
});
