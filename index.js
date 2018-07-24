import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { MongoClient } from 'mongodb';
import config from './config';
import { dataloaders } from './graphql';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import startup from './startup';

const mongoUri = config.get('mongoUri');

startup().then(async () => {
  const client = await MongoClient.connect(mongoUri, {
    bufferMaxEntries: 0, // Turn off all buffering, error immediately if disconnected
    useNewUrlParser: true,
    // socketTimeoutMS: 5000, // COMBAK: when use replicaSet and primary was stopped
    readPreference: 'SECONDARY_PREFERRED',
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { dataloaders: dataloaders(), connection: client, userId: 'admin' },
  });

  const app = express();
  server.applyMiddleware({ app });

  const port = config.get('port');
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });

  // The GraphQL endpoint
  // app.use('/graphql', bodyParser.json(), graphqlExpress({
  //   schema,
  //   context: { dataloaders: dataloaders(), connection: client, userId: 'admin' },
  // }));
  // app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  // // Start the server
  // const port = config.get('port');
  // app.listen(port, () => {
  //   console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
  // });
});
