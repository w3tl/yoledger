jest.mock('mongodb');

import { graphql } from 'graphql';
import schema, { dataloaders } from '../../index';
import { Budget } from '../../../model';

describe('budget schema', () => {
  const { connection } = require('mongodb');
  const budgetModel = new Budget(connection.db(), 'admin');

  it('must return plan with periods and accounts', async () => {
    const query = `
    query budgets($dateStart: Date!, $count: Int) {
      budgets(dateStart: $dateStart, count: $count) {
        periods
        accounts {
          account { name }
          allocations {
            date
            amount
            balance
          }
        }
      }
    }
    `;
    const rootValue = {};
    const context = { dataloaders: dataloaders(connection), models: { budgetModel } };
    const variables = {
      dateStart: '2018-05-10',
      count: 4,
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    expect(result.data).toMatchSnapshot('4 periods from 2018-05-10');
  });
});
