jest.mock('mongodb');

import { Query, User } from '../resolver';
import { User as UserModel } from '../../../model';

const userId = 'admin';

describe('user resolver', () => {
  const { connection } = require('mongodb');
  const models = { userModel: new UserModel(connection.db(), userId) };
  test('Query', async () => {
    const result = await Query.user(null, {}, { models });
    expect(result).toMatchSnapshot();
  });

  test('User', () => {
    expect(User.username({ _id: userId })).toBe(userId);
  });
});
