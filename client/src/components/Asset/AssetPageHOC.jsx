import React from 'react';
import { Query } from 'react-apollo';
import { LIST_QUERY } from './queries';
import AssetPage from './AssetPage';

export default props => (
  <Query query={LIST_QUERY}>
    {({ loading, error, data }) => (
      <AssetPage assets={data.assets} {...props} error={error} loading={loading} />
    )}
  </Query>
);
