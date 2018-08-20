import gql from 'graphql-tag';

export default {
  income: gql`
    fragment IncomeAccount on Account {
      id
      name
    }
  `,
};
