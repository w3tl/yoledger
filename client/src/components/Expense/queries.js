import gql from 'graphql-tag';
import fragments from './fragments';

export const LIST_QUERY = gql`
query ExpensesQuery {
  accounts(type: EXPENSE) {
    ...ExpenseAccount
  }
}
${fragments.expense}
`;

export const FORM_QUERY = gql`
query ExpenseQuery($id: ID!) {
  account(id: $id) {
    ...ExpenseAccount
  }
}
${fragments.expense}
`;

export const ADD_MUTATION = gql`
mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    account {
      ...ExpenseAccount
    }
  }
}
${fragments.expense}
`;
