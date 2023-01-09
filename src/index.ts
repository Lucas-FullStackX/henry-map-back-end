import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs/index';
import { resolvers } from './resolvers';
import { connectDb } from './DB';
import { checkJwt } from './auth0';

dotenv.config();

const app: Express = express();
connectDb();
const port = process.env.PORT;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port || 3001}/api`,
  );
});
async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (req) => {
      const { authorization: token } = req.req.headers;
      return { token };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });

  app.use((req, res, next) => {
    res.status(404).send('not found');
  });
  app.use('/api', checkJwt);

  app.listen(process.env.PORT || 3001, () =>
    console.log('Server on port', process.env.PORT || 3001),
  );
}

start();
