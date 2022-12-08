import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs/index';
import { resolvers } from './resolvers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port || 3001}`,
  );
});
async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });

  app.use((req, res, next) => {
    res.status(404).send('not found');
  });

  app.listen(process.env.PORT || 3000, () =>
    console.log('Server on port', process.env.PORT || 3000),
  );
}

start();
