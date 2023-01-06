import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import { resolvers } from './resolvers.js';

const PORT = 9000;
const app = express();

const typeDefs = await readFile('./schema.graphql', 'utf-8');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
