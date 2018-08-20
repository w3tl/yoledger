import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

export const QUERY = gql`
query BudgetPeriodsQuery($dateStart: Date!, $count: Int) {
  budgets(dateStart: $dateStart, count: $count) {
    periods
    accounts {
      name
    }
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation upsertBudget($input: UpsertBudgetInput!) {
  upsertBudget(input: $input) {
    success
    allocation {
      id
      account { id name }
      amount
    }
  }
}
`;

// eslint-disable-next-line react/prop-types
const withQuery = Component => ({ dateStart, count, ...other }) => (
  <Query query={QUERY} variables={{ dateStart, count }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';
      return <Component {...data.budgets} dateStart={dateStart} count={count} {...other} />;
    }}
  </Query>
);

const withUpdateMutation = Component => props => (
  <Mutation
    mutation={UPDATE_MUTATION}
    update={(cache, { data: { upsertBudget } }) => {
      const { budgets } = cache.readQuery({
        query: QUERY,
        variables: { dateStart: props.dateStart, count: props.count },
      });
      cache.writeQuery({
        query: QUERY,
        variables: { dateStart: props.dateStart, count: props.count },
        data: {
          budgets: {
            ...budgets,
            accounts: budgets.accounts.concat(upsertBudget.allocation.account),
          },
        },
      });
    }}
  >
    {(upsertBudget, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error mutation!';
      if (data && data.upsertBudget) {
        console.log(data);
      }
      return <Component {...props} onCreate={upsertBudget} />;
    }}
  </Mutation>
);

export default Component => withQuery(withUpdateMutation(Component));
