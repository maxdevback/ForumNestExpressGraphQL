export interface ICommentCreate {
  authorId: string;
  postId: string;
  username: string;
  body: string;
  parentCommentId?: string;
}
