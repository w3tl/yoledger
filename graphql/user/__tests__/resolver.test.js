jest.mock('mongodb');

import { Query, User } from '../resolver';

const userId = 'admin';

describe('user resolver', () => {
  const { connection } = require('mongodb');
  test('Query', async () => {
    const result = await Query.user(null, {}, {
      userId, connection,
    });
    expect(result).toMatchSnapshot();
  });

  test('User', () => {
    expect(User.username({ _id: userId })).toBe(userId);
  });
});
