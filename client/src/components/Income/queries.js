import gql from 'graphql-tag';
import fragments from './fragments';

export const LIST_QUERY = gql`
query IncomesQuery {
  accounts(type: INCOME) {
    ...IncomeAccount
  }
}
${fragments.income}
`;

export const FORM_QUERY = gql`
query IncomeQuery($id: ID!) {
  account(id: $id) {
    ...IncomeAccount
  }
}
${fragments.income}
`;

export const ADD_MUTATION = gql`
mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    account {
      ...IncomeAccount
    }
  }
}
${fragments.income}
`;
