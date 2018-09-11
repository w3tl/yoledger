import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { COLUMN_QUERY, UPDATE_MUTATION } from './queries';

const withQuery = Component => ({ date, ...other }) => (
  <Query query={COLUMN_QUERY} variables={{ date }}>
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
  <Mutation
    mutation={UPDATE_MUTATION}
    update={(cache, { data: { upsertBudget } }) => {
      const { budget } = cache.readQuery({
        query: COLUMN_QUERY,
        variables: { date: props.date },
      });
      cache.writeQuery({
        query: COLUMN_QUERY,
        variables: { date: props.date },
        data: {
          budget: budget.concat(upsertBudget.allocation),
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
