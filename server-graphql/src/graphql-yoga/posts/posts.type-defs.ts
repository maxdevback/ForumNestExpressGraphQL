export const postsTypeDefs = `
  type Post {
    post_id: ID
    title: String
    body: String
    hasComments: Boolean 
    roughNumberOfLikes: Int 
    author: User
  }
  input PostCreate {
    title: String!
    body: String!
  } 

  type Query {
    posts(page: Int!): [Post]
  }
  type Mutation {
    createPost(data: PostCreate): Post
  }
`;
