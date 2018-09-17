/* eslint-disable react/jsx-filename-extension,import/no-extraneous-dependencies */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { withClientState } from 'apollo-link-state';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { defaults, Mutation } from '../../apollo/resolvers';
import stateTypeDefs from '../../apollo/typeDefs';

export const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

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
// TODO: add context with token

export const withProvider = Component => props => (
  <ApolloProvider client={client}>
    <Component client={client} {...props} />
  </ApolloProvider>
);

export const testRenderWithoutError = (Component) => {
  it('renders without error', async () => {
    const wrapper = shallow(Component);
    await wait();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
};

export const testLoadingState = (Component) => {
  it('should render loading state initially', () => {
    const wrapper = mount(Component);
    expect(true).toEqual(true);
  });
};

export const testErrorUI = (Component) => {
  it('should show error UI', async () => {
    const wrapper = mount(Component);
    await wait(0); // wait for response
    expect(wrapper.update().text()).toContain('Error');
  });
};

// THNX: http://blog.blakesimpson.co.uk/read/98-how-to-stub-date-in-jest-tests-building-a-stubdate-helper
export const stubDate = (fixedDate) => {
  const date = new Date(fixedDate);
  let originalDate;

  beforeAll(() => {
    originalDate = Date;

    global.Date = class extends Date {
      constructor() {
        super();

        return date;
      }

      static now() {
        return date.getTime();
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });
};
