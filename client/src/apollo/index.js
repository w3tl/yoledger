import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import decode from 'jwt-decode';
import { defaults, Mutation } from './resolvers';
import typeDefs from './typeDefs';

export default () => {
  const cache = new InMemoryCache();

  const stateLink = withClientState({
    resolvers: { Mutation }, defaults, cache, typeDefs,
  });
  const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    let authorization = token || '';
    if (token) {
      const { exp } = decode(token);
      if (exp < (Date.now() / 1000)) {
        localStorage.removeItem('token');
        authorization = '';
      }
    }
    return {
      headers: {
        ...headers,
        authorization,
      },
    };
  });

  const link = ApolloLink.from([stateLink, authLink.concat(httpLink)]);

  const client = new ApolloClient({
    cache,
    link,
  });

  client.onResetStore(stateLink.writeDefaults);

  return client;
};
