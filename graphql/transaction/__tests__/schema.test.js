jest.mock('mongodb');

import { graphql } from 'graphql';
import schema, { dataloaders } from '../../index';

const userId = 'admin';

describe('transaction schema', () => {
  const { connection } = require('mongodb');
  test('should be return transaction with source and destination', async () => {
    const query = `
    query transactions($dateStart: Date!, $page: Int, $itemsPerPage: Int) {
      transactions(dateStart: $dateStart, page: $page, itemsPerPage: $itemsPerPage) {
         id
         source { name balance }
         destination { name balance }
         amount
         date
      }
    }
    `;
    const rootValue = {};
    const context = {
      dataloaders: dataloaders(connection), userId, connection,
    };
    const variables = {
      dateStart: '2018-06-20',
      page: 0,
      itemsPerPage: 1,
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    const { data } = result;

    expect(data).toMatchSnapshot('Transactions with source and destination accounts');
  });

  test('Should be return transactions between two dates', async () => {
    const query = `
    query transactions($dateStart: Date!, $dateEnd: Date, $page: Int, $itemsPerPage: Int) {
      transactions(dateStart: $dateStart, dateEnd: $dateEnd, page: $page, itemsPerPage: $itemsPerPage) {
         id
         source { name }
         destination { name }
         amount
         date
      }
    }
    `;
    const rootValue = {};
    const context = { dataloaders: dataloaders(connection), userId: 'admin', connection };
    const variables = {
      dateStart: '2018-06-20',
      dateEnd: '2018-06-23',
      page: 0,
      itemsPerPage: 5,
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    const { data } = result;

    expect(data).toMatchSnapshot(`Transactions between ${variables.dateStart} and ${variables.dateEnd}`);
  });
});
