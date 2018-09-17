import React from 'react';
import { Query, Mutation, compose } from 'react-apollo';
import { ROW_QUERY, UPDATE_MUTATION } from './queries';
import BudgetTableRow from './BudgetTableRow';

export const updateAfterUpsert = ({ account, dateStart, dateEnd }) =>
  (cache, { data: { upsertBudget } }) => { // eslint-disable-line implicit-arrow-linebreak
    const variables = { account: account.name, dateStart, dateEnd };
    const { budget } = cache.readQuery({ query: ROW_QUERY, variables });
    const existingBudget = budget.find(b => b.id === upsertBudget.budget.id);
    const data = {
      budget: existingBudget ? budget : budget.concat(upsertBudget.budget),
    };
    cache.writeQuery({ query: ROW_QUERY, variables, data });
  };

const withData = Wrapped => props => (
  <Query
    query={ROW_QUERY} // eslint-disable-next-line react/destructuring-assignment
    variables={{ account: props.account.name, dateStart: props.dateStart, dateEnd: props.dateEnd }}
  >
    {({ loading, error, data }) => {
      if (error) return error.message;
      return <Wrapped budget={data.budget} {...props} loading={loading || props.loading} />;
    }}
  </Query>
);

const withUpdate = Wrapped => props => (
  <Mutation mutation={UPDATE_MUTATION} update={updateAfterUpsert(props)}>
    {(upsertBudget, { loading, error }) => {
      if (error) return error.message;
      const onUpdate = ({ date, account }) => ({ amount }) => {
        upsertBudget({ variables: { input: { account, date, amount } } });
      };
      return (
        <Wrapped onUpdate={onUpdate} {...props} loading={loading || props.loading} />
      );
    }}
  </Mutation>
);

export default compose(withData, withUpdate)(BudgetTableRow);
