jest.mock('mongodb');

import { graphql } from 'graphql';
import schema from '../../index';

describe('account schema', () => {
  const { connection } = require('mongodb');
  it('Should be return accounts', async () => {
    const query = `
    query accounts($type: AccountType!) {
      accounts(type: $type) {
         name
         balance
      }
    }
    `;

    const rootValue = {};
    const context = { userId: 'admin', connection };
    const variables = {
      type: 'ASSET',
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    const { data } = result;

    expect(data.accounts).toMatchSnapshot('query ASSET accounts');
  });
});
