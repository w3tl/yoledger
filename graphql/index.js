import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import dataloaders from './dataloaders';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { dataloaders };
