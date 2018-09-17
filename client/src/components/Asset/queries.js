import gql from 'graphql-tag';
import fragments from './fragments';

export const LIST_QUERY = gql`
query AssetsQuery {
  accounts(type: ASSET) {
    ...AssetFormAccount
  }
}
${fragments.asset}
`;


export const FORM_QUERY = gql`
query AssetQuery($id: ID!) {
  account(id: $id) {
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
