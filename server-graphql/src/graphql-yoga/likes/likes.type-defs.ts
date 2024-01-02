export const likesTypeDefs = `
  type Like {
    id: ID
    post: Post
    comment: Comment
    hasReplays: Boolean 
    author: User
  }
  input likeForCommentCreate {
    commentId: Int!
  } 
  input likeForPostUpdate {
    postId: Int!
  }
  type Query {
    likeComment: 
    likePost:
  }
  type Mutation {
    
  }
`;
