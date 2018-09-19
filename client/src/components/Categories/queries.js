import gql from 'graphql-tag';
import fragments from './fragments';

export const LIST_QUERY = gql`
query CategoriesQuery {
  expenses: accounts(type: EXPENSE) {
    ...Category
  }
  incomes: accounts(type: INCOME) {
    ...Category
  }
}
${fragments.category}
`;

export const ADD_MUTATION = gql`
mutation addAccount($input: AddAccountInput!) {
  addAccount(input: $input) {
    account {
      ...Category
    }
  }
}
${fragments.category}
`;
