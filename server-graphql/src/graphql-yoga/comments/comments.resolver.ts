import { Request, Response } from "express";
import { CommentsService } from "./comments.service";
import { ICommentCreateFromGraph } from "./comment.interfaces";

export const commentResolver = {
  Query: {
    getCommentsByPostIdAndPage: async (
      _: undefined,
      data: { postId: number; page: number }
    ) => {
      return await CommentsService.getCommentsByPostIdAndPage(
        +data.postId,
        data.page
      );
    },
    getReplaysByCommentIdAndPostIdAndPage: async (data: {
      postId: number;
      commentId: number;
      page: number;
    }) => {
      return await CommentsService.getReplaysByCommentIdAndPostIdAndPage(
        +data.commentId,
        +data.postId,
        data.page
      );
    },
  },
  Mutation: {
    createComment: async (
      _: undefined,
      data: { data: ICommentCreateFromGraph },
      context: { req: Request }
    ) => {
      //TODO:
      if (!context.req.user) throw {};

      const { username, id } = context.req.user;
      return await CommentsService.create({
        ...data.data,
        authorId: id,
        username: username,
      });
    },
  },
};
