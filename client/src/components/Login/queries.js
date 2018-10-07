import gql from 'graphql-tag';

export const SIGNIN_MUTATION = gql`
mutation signin($login: String!, $password: String!) {
  signin(login: $login, password: $password) {
    token
  }
}
`;

export const SIGNOUT_MUTATION = gql`
mutation signout($token: String) {
  signout(token: $token) {
    success
  }
}
`;
