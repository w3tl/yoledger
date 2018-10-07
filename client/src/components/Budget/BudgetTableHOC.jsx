import React from 'react';
import { Query, Mutation, compose } from 'react-apollo';
import { Segment } from 'semantic-ui-react';
import { BODY_QUERY, UPDATE_MUTATION } from './queries';

export const updateAfterCreate = ({ dateStart, dateEnd }) =>
  (cache, { data: { upsertBudget } }) => { // eslint-disable-line implicit-arrow-linebreak
    const variables = { dateStart, dateEnd };
    const { budgets } = cache.readQuery({ query: BODY_QUERY, variables });
    const data = {
      budgets: {
        ...budgets,
        accounts: budgets.accounts.concat(upsertBudget.budget.account),
      },
    };
    cache.writeQuery({ query: BODY_QUERY, variables, data });
  };

const withQuery = Component => ({ dateStart, dateEnd, ...other }) => (
  <Query query={BODY_QUERY} variables={{ dateStart, dateEnd }}>
    {({ loading, error, data }) => {
      if (loading) return <Segment loading />;
      if (error) return error.message;
      return (
        <Component {...data.budgets} dateStart={dateStart} dateEnd={dateEnd} {...other} />
      );
    }}
  </Query>
);

const withUpdateMutation = Component => props => (
  <Mutation mutation={UPDATE_MUTATION} update={updateAfterCreate(props)}>
    {(upsertBudget, { loading, error }) => {
      if (error) return error.message;
      return <Component {...props} loading={loading} onCreate={upsertBudget} />;
    }}
  </Mutation>
);

export default compose(withQuery, withUpdateMutation);
