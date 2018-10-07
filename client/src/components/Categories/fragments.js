import gql from 'graphql-tag';

export default {
  category: gql`
    fragment Category on Account {
      id
      name
      type
    }
  `,
};
