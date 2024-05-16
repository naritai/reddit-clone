import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver, PostResolver],
    validate: false,
  });

  // console.log('schema', schema);

  const apolloServer = new ApolloServer({
    schema,
    context: () => ({ orm }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server is listening on port 4000');
  });
};

main().catch(console.error);
