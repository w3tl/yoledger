import React from 'react'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { withClientState } from 'apollo-link-state';
import { makeExecutableSchema } from 'graphql-tools';
import { defaults, Mutation } from '../src/apollo/resolvers';
import stateTypeDefs from '../src/apollo/typeDefs';
import typeDefs from '../src/components/testHelpers/typeDefs';
import resolvers from '../src/components/testHelpers/resolvers';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const cache = new InMemoryCache();
const stateLink = withClientState({
  resolvers: { Mutation }, defaults, cache, typeDefs: stateTypeDefs,
});
export const client = new ApolloClient({
  link: ApolloLink.from([stateLink, new SchemaLink({ schema: executableSchema })]),
  cache,
});

export default story => (
  <ApolloProvider client={client}>
    {story()}
  </ApolloProvider>
);
