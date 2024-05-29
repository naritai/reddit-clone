import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { COOKIE_NAME, __PROD__ } from './constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import { MyContext } from './types';
import cors from 'cors';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  // Session management
  // -- Initialize client.
  const redisClient = createClient({
    password: 'salquest123',
  });
  redisClient.connect().catch(console.error);

  // -- Initialize store.
  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
    prefix: 'myapp:',
  });

  // -- Initialize session storage.
  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: 'whooooyaa',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
        domain: 'localhost',
        path: '/graphql',
      },
    })
  );

  // Session management

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ orm, req, res }),
    plugins: [
      __PROD__
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: 'plaid-gufzoj@current',
            includeCookies: true,
          })
        : ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            includeCookies: true,
          }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server is listening on port 4000');
  });
};

main().catch(console.error);
