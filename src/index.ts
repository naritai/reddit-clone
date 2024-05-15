import { MikroORM } from '@mikro-orm/core';
import { __PROD__ } from './constants';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  await orm.getMigrator().up();

  // const post = orm.em.fork().create(Post, {
  //   title: 'First Post!',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  // await orm.em.fork().persistAndFlush(post);

  const posts = await orm.em.fork().find(Post, {});
  console.log('POSTS', posts);
};

main().catch(console.error);
