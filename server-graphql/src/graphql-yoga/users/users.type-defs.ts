export const usersTypeDefs = `
  type User {
    user_id: ID
    username: String
    posts: [Post]
  }
  type Query {
    users(page: Int!): [User]
    user(id: ID!): User 
  }
`;
