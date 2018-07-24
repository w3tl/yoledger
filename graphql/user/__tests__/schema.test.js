jest.mock('mongodb');

import { graphql } from 'graphql';
import schema, { dataloaders } from '../../index';

const userId = 'admin';

describe('user schema', () => {
  const { connection } = require('mongodb');
  test('should be return user by context', async () => {
    const query = `
    query user {
      user {
         username
      }
    }
    `;
    const rootValue = {};
    const context = {
      dataloaders: dataloaders(connection), userId, connection,
    };
    const variables = {};

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    const { data } = result;

    expect(data).toMatchSnapshot(userId);
  });
});
