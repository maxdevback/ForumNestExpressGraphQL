export interface ICommentCreate {
  authorId: number;
  postId: number;
  username: string;
  body: string;
  parentCommentId?: number;
}
export interface ICommentCreateFromGraph {
  body: string;
  postId: number;
  parentCommentId: number;
}
