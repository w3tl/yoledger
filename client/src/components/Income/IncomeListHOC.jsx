import React from 'react';
import { Query } from 'react-apollo';
import { LIST_QUERY } from './queries';

const withQuery = Component => props => (
  <Query query={LIST_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';

      return (
        <Component incomes={data.accounts} {...props} />
      );
    }}
  </Query>
);

export default Component => withQuery(Component);
