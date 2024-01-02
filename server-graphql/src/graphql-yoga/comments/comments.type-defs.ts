export const commentsTypeDefs = `
  type Comment {
    id: ID
    username: String
    body: String
    hasReplays: Boolean 
    roughNumberOfLikes: Int 
    author: User
    post: Post
    parentComment: Comment
  }
  input CommentCreate {
    body: String!
    postId: Int!,
    parentCommentId: Int
  } 
  input CommentUpdate {
    title: String,
    body: String,
  }
  type Query {
    getCommentsByPostIdAndPage(postId: ID, page: Int): [Comment]
    getReplaysByCommentIdAndPostIdAndPage(postId: ID, commentId: ID, page: Int): [Comment]
  }
  type Mutation {
    createComment(data: CommentCreate): Comment
  }
`;
