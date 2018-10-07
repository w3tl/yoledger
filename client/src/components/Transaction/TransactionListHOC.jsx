import React from 'react';
import { Query } from 'react-apollo';
import { LIST_QUERY } from './queries';
import TransactionList from './TransactionList';

export default ({ dateStart, dateEnd, ...other }) => (
  <Query query={LIST_QUERY} variables={{ dateStart, dateEnd }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return error.message;

      return (
        <TransactionList
          dateStart={dateStart}
          dateEnd={dateEnd}
          transactions={data.transactions}
          {...other}
        />
      );
    }}
  </Query>
);
