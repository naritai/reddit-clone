import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Post {
  // @Entity() decorates and tells mikro-orm that this is Entity and it corresponds to the database table
  // If we remove @PrimaryKey() then properties won't be database columns, but just field of class

  @PrimaryKey()
  _id!: number;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: 'text' })
  title!: string;
}
