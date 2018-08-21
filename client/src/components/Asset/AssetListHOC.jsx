import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import fragments from './fragments';

export const QUERY = gql`
query AssetsQuery {
  accounts(type: ASSET) {
    ...AssetFormAccount
  }
}
${fragments.asset}
`;

const withQuery = Component => props => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return 'Error!';
      return (
        <Component assets={data.accounts} {...props} />
      );
    }}
  </Query>
);

export default Component => withQuery(Component);
