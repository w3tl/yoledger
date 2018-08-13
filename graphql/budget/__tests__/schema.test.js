jest.mock('mongodb');

import { graphql } from 'graphql';
import schema, { dataloaders } from '../../index';
import { Budget } from '../../../model';

describe('budget schema', () => {
  const { connection } = require('mongodb');
  const budgetModel = new Budget(connection.db(), 'admin');
  const context = {
    dataloaders: dataloaders(connection),
    models: { budgetModel },
    userId: 'admin',
  };

  it('must return plan with periods, accounts and allocations', async () => {
    const query = `
    query budgets($dateStart: Date!, $count: Int) {
      budgets(dateStart: $dateStart, count: $count) {
        periods
        accounts { name }
        budget {
          date
          allocations {
            account { name }
            amount
            balance
          }
        }
      }
    }
    `;
    const rootValue = {};
    const variables = {
      dateStart: '2018-05-10',
      count: 4,
    };

    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.errors).toBeUndefined();
    expect(result.data.budgets.periods).toHaveLength(4);
    expect(result.data).toMatchSnapshot('4 periods from 2018-05-10');
  });
});
