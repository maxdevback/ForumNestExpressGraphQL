import { prisma } from "../yoga.server";
import { ICreatePostsInterfaces } from "./posts.interfaces";

class PostsServiceClass {
  take = 25;
  async posts(page: number) {
    const skip = (page - 1) * this.take;
    const posts = await prisma.post.findMany({ skip, take: this.take });
    console.log(posts);
    return posts;
  }

  async create(data: ICreatePostsInterfaces) {
    console.log(data);
    const res = await prisma.post.create({
      data: { ...data, author: { connect: { id: data.author } } },
    });
    console.log(res);
    return res;
  }

  async post(id: number) {
    const post = await prisma.post.findUnique({
      include: { author: true },
      where: { id },
    });
    console.log(post);
    return post;
  }
}

export const PostsService = new PostsServiceClass();
