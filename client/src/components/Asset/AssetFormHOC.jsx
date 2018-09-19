import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_MUTATION, LIST_QUERY } from './queries';
import AssetForm from './AssetForm';

export const updateAfterAdd = (cache, { data: { addAccount } }) => {
  const { assets } = cache.readQuery({ query: LIST_QUERY });
  const data = { assets: assets.concat(addAccount.account) };
  cache.writeQuery({ query: LIST_QUERY, data });
};

export default props => (
  <Mutation mutation={ADD_MUTATION} update={updateAfterAdd}>
    {(addAccount, { loading, error }) => (
      <AssetForm onCreate={addAccount} {...props} error={error} loading={loading} />
    )}
  </Mutation>
);
