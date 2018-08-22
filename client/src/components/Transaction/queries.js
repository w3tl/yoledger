import gql from 'graphql-tag';
import fragments from './fragments';

export const FORM_QUERY = gql`
query TransactionQuery($id: ID!) {
  transaction(id: $id) {
    ...TransactionFormTransaction
  }
}
${fragments.transaction}
`;

export const LIST_QUERY = gql`
query TransactionsQuery($dateStart: Date!, $dateEnd: Date, $page: Int, $itemsPerPage: Int) {
  transactions(dateStart: $dateStart, dateEnd: $dateEnd, page: $page, itemsPerPage: $itemsPerPage) {
    ...TransactionFormTransaction
  }
}
${fragments.transaction}
`;

export const ADD_MUTATION = gql`
mutation addTransaction($input: AddTransactionInput!) {
  addTransaction(input: $input) {
    transaction {
      ...TransactionFormTransaction
    }
  }
}
${fragments.transaction}
`;

export const DELETE_MUTATION = gql`
mutation deleteTransaction($id: ID!) {
  deleteTransaction(id: $id) {
    success
    id
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation updateTransaction($id: ID!, $input: UpdateTransactionInput!) {
  updateTransaction(id: $id, input: $input) {
    transaction {
      ...TransactionFormTransaction
    }
  }
}
${fragments.transaction}
`;

export const GET_PAGE_SETTINGS = gql`
query {
  settings @client {
    transaction {
      period
      date
    }
  }
}
`;

export const CHANGE_PERIOD = gql`
  mutation changePeriod($period: Period, $date: String) {
    changeTransactionPagePeriod(period: $period, date: $date) @client {
      period
      date
    }
  }
`;
