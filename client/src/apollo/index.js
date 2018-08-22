import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { defaults, Mutation } from './resolvers';
import typeDefs from './typeDefs';

export default () => {
  const cache = new InMemoryCache();

  const stateLink = withClientState({
    resolvers: { Mutation }, defaults, cache, typeDefs,
  });
  const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });
  const link = ApolloLink.from([stateLink, httpLink]);

  const client = new ApolloClient({
    cache,
    link,
  });

  return client;
};
