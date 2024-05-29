import { __PROD__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import path from 'path';
import { User } from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post, User],
  driver: PostgreSqlDriver,
  driverOptions: {
    connection: {
      user: 'macbook-usa',
    },
  },
  dbName: 'reddb',
  debug: !__PROD__,
  extensions: [Migrator],
} as Parameters<typeof MikroORM.init>[0];
