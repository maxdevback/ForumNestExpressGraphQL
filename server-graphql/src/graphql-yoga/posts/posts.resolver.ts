import { prisma } from "../yoga.server";
import { IUpdatePostsInterface } from "./posts.interfaces";
import { PostsService } from "./posts.service";

export const PostsResolver = {
  Query: {
    posts: async (_: any, data: { page: number }) => {
      return await PostsService.posts(data.page);
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      data: { data: { title: string; body: string } },
      context: { req: any; res: any }
    ) => {
      //TODO:
      if (!context.req.user) {
        console.log("Error with auth");
        throw {};
      }
      console.log(context.req.user);
      return await PostsService.create({
        ...data.data,
        author: context.req.user.id,
      });
    },
    updatePostById: async (
      _: any,
      data: { id: number; data: IUpdatePostsInterface },
      context: { req: any; res: any }
    ) => {
      if (!context.req.user) {
        console.log("Error with auth");
        throw {};
      }
      return await PostsService.updatePostById(
        +data.id,
        context.req.user.id,
        data.data
      );
    },
  },
};
