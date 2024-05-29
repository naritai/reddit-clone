import { Post } from '../entities/Post';
import { MyContext } from 'src/types';
import { Query, Resolver, Ctx, Arg, Mutation } from 'type-graphql';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { orm: { em } }: MyContext): Promise<Post[]> {
    return em.fork().find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id') id: number,
    @Ctx() { orm: { em } }: MyContext
  ): Promise<Post | null> {
    return em.fork().findOne(Post, { _id: id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Ctx() { orm: { em } }: MyContext
  ): Promise<Post> {
    const now = new Date();
    const post = em
      .fork()
      .create(Post, { title, createdAt: now, updatedAt: now });
    await em.fork().persistAndFlush(post);

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() { orm: { em } }: MyContext
  ): Promise<Post | null> {
    const post = await em.fork().findOne(Post, { _id: id });

    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      post.title = title;
      post.updatedAt = new Date();
      await em.fork().persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id') id: number,
    @Ctx() { orm: { em } }: MyContext
  ): Promise<Boolean> {
    await em.fork().nativeDelete(Post, { _id: id });
    return true;
  }
}
