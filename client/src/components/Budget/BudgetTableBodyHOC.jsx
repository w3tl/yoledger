import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { BODY_QUERY, UPDATE_MUTATION } from './queries';

const withQuery = Component => ({ dateStart, count, ...other }) => (
  <Query query={BODY_QUERY} variables={{ dateStart, count }}>
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
        query: BODY_QUERY,
        variables: { dateStart: props.dateStart, count: props.count },
      });
      cache.writeQuery({
        query: BODY_QUERY,
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
        // console.log(data);
      }
      return <Component {...props} onCreate={upsertBudget} />;
    }}
  </Mutation>
);

export default Component => withQuery(withUpdateMutation(Component));
