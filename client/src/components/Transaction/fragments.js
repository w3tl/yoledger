import gql from 'graphql-tag';

export default {
  transaction: gql`
    fragment TransactionFormTransaction on Transaction {
      id
      amount
      source {
        id
        name
      }
      destination {
        id
        name
      }
      date
    }
  `,
};
