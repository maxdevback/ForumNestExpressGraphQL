import { prisma } from "../yoga.server";
import {
  ICreatePostsInterface,
  IUpdatePostsInterface,
} from "./posts.interfaces";

class PostsServiceClass {
  take = 25;
  async posts(page: number) {
    const skip = (page - 1) * this.take;
    const posts = await prisma.post.findMany({
      skip,
      take: this.take,
      include: { author: true },
    });
    console.log("posts", posts);
    return posts;
  }

  async create(data: ICreatePostsInterface) {
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
  async updatePostById(
    id: number,
    authorId: number,
    newData: IUpdatePostsInterface
  ) {
    //TODO: Error
    const res = await prisma.post.update({
      where: { id, authorId },
      data: newData,
    });
    return res;
  }
}

export const PostsService = new PostsServiceClass();
