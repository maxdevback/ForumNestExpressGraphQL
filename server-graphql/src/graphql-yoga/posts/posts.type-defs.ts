export const postsTypeDefs = `
  type Post {
    id: ID
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
  input PostUpdate {
    title: String,
    body: String,
  }

  type Query {
    posts(page: Int!): [Post]
  }
  type Mutation {
    createPost(data: PostCreate): Post
    updatePostById(id: ID, data: PostUpdate): Post
  }
`;
