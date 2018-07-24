jest.mock('mongodb');

import { graphql } from 'graphql';
import schema, { dataloaders } from '../../index';

describe('budget schema', () => {
  const { connection } = require('mongodb');
  it('must return budget between dates', async () => {
    const query = `
    query budget($dateStart: Date!, $dateEnd: Date!) {
      budget(dateStart: $dateStart, dateEnd: $dateEnd) {
         account { name }
         date
         amount
      }
    }
    `;
    const rootValue = {};
    const context = { dataloaders: dataloaders(connection), userId: 'admin', connection };
    const variables = {
      dateStart: '2018-05-10',
      dateEnd: '2018-05-20',
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    expect(result.data.budget).toMatchSnapshot(`between ${variables.dateStart} and ${variables.dateEnd}`);
  });

  it('must return budget for account between dates', async () => {
    const query = `
    query budget($dateStart: Date!, $dateEnd: Date!, $account: String) {
      budget(dateStart: $dateStart, dateEnd: $dateEnd, account: $account) {
         account { name }
         date
         amount
      }
    }
    `;
    const rootValue = {};
    const context = { dataloaders: dataloaders(connection), userId: 'admin', connection };
    const variables = {
      dateStart: '2018-06-21',
      dateEnd: '2018-07-01',
      account: 'Food',
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    expect(result.data.budget).toMatchSnapshot(`between ${variables.dateStart} and ${variables.dateEnd} for ${variables.account}`);
  });
});
