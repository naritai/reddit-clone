import {
  MikroORM,
  IDatabaseDriver,
  Connection,
  EntityManager,
} from '@mikro-orm/core';
import { Request, Response } from 'express';

export type MyContext = {
  orm: MikroORM<
    IDatabaseDriver<Connection>,
    EntityManager<IDatabaseDriver<Connection>>
  >;
  req: Request;
  res: Response;
};

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
