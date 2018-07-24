jest.mock('mongodb');

import { Query, Mutation, Account } from '../resolver';

const userId = 'admin';

describe('account resolver', () => {
  const { connection } = require('mongodb');
  test('Query', async () => {
    const result = await Query.accounts(null, { type: 'ASSET' }, { userId, connection });
    expect(result).toMatchSnapshot('accounts');
  });

  test('Account', () => {
    expect(Account.id({ _id: '1' })).toBe('1');
  });

  describe('Mutation', () => {
    test('addAccount', async () => {
      const result = await Mutation.addAccount(null, {
        input: { name: 'iTunes', type: 'EXPENSE' },
      }, { userId, connection });
      expect(result).toMatchSnapshot();
    });
  });
});
