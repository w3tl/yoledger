import gql from 'graphql-tag';

export default {
  asset: gql`
    fragment AssetFormAccount on Account {
      id
      name
      balance
    }
  `,
};
