import gql from 'graphql-tag';
import fragments from './fragments';

export const LIST_QUERY = gql`
query AssetsQuery {
  assets: accounts(type: ASSET) {
    ...AssetFormAccount
  }
}
${fragments.asset}
`;

export const ADD_MUTATION = gql`
mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    account {
      ...AssetFormAccount
    }
  }
}
${fragments.asset}
`;
