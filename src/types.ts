import {
  MikroORM,
  IDatabaseDriver,
  Connection,
  EntityManager,
} from '@mikro-orm/core';

export type MyContext = {
  orm: MikroORM<
    IDatabaseDriver<Connection>,
    EntityManager<IDatabaseDriver<Connection>>
  >;
};
