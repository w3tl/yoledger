import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_PAGE_SETTINGS, CHANGE_PERIOD } from './queries';
import TransactionPage from './TransactionPage';

export default props => (
  <Query query={GET_PAGE_SETTINGS}>
    {({ data: { settings } }) => (
      <Mutation mutation={CHANGE_PERIOD}>
        {(changePeriod, { loading, data }) => {
          if (loading) return 'Loading';
          let pageSettings = {
            ...settings.transaction,
          };
          if (data && data.changePeriod) {
            pageSettings = { ...data.changePeriod };
          }
          return (
            <TransactionPage onChangePeriod={changePeriod} {...pageSettings} {...props} />);
        }}
      </Mutation>
    )}
  </Query>
);
