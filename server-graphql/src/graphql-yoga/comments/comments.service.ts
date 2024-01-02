import { prisma } from "../yoga.server";
import { ICommentCreate } from "./comment.interfaces";

class CommentsServiceClass {
  take = 25;
  async create(data: ICommentCreate) {
    const dataForPrisma: any = {
      username: data.username,
      body: data.body,
      author: { connect: { id: data.authorId } },
      post: { connect: { id: data.postId } },
    };
    if (data.parentCommentId) {
      dataForPrisma.parentComment = { connect: { id: data.parentCommentId } };
    }
    const comment = await prisma.comment.create({
      data: dataForPrisma,
    });
    return comment;
  }
  async getCommentsByPostIdAndPage(postId: number, page: number) {
    const skip = (page - 1) * this.take;
    const res = await prisma.comment.findMany({
      where: { parentComment: { id: undefined }, post: { id: postId } },
      take: this.take,
      skip,
      include: { post: true, author: true },
    });
    console.log(res);
    return res;
  }
  async getReplaysByCommentIdAndPostIdAndPage(
    commentId: number,
    postId: number,
    page: number
  ) {
    const skip = (page - 1) * this.take;
    const res = await prisma.comment.findMany({
      where: { parentComment: { id: +commentId }, post: { id: +postId } },
      take: this.take,
      skip,
      include: { post: true, author: true, parentComment: true },
    });
    return res;
  }
}

export const CommentsService = new CommentsServiceClass();
