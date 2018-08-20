import gql from 'graphql-tag';

export default {
  expense: gql`
    fragment ExpenseAccount on Account {
      id
      name
    }
  `,
};
