import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

export const QUERY = gql`
query BudgetQuery($date: Date!) {
  budget(date: $date) {
    id
    account {
      name
    }
    amount
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation upsertBudget($input: UpsertBudgetInput!) {
  upsertBudget(input: $input) {
    success
    allocation {
      id
      amount
    }
  }
}
`;

// eslint-disable-next-line react/prop-types
const withQuery = Component => ({ date, ...other }) => (
  <Query query={QUERY} variables={{ date }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';
      return (
        <Component {...data} date={date} {...other} />
      );
    }}
  </Query>
);

const withUpdateMutation = Component => props => (
  <Mutation mutation={UPDATE_MUTATION}>
    {(upsertBudget, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error mutation!';
      if (data && data.upsertBudget) {
        console.log(data);
      }
      const onUpdate = ({ date, account }) => ({ amount }) => upsertBudget({
        variables: {
          input: { account, date, amount },
        },
      });
      return <Component {...props} onUpdate={onUpdate} />;
    }}
  </Mutation>
);

export default Component => withQuery(withUpdateMutation(Component));
