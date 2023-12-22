export const usersTypeDefs = `
  type User {
    id: ID
    email: String 
    username: String
  }
  type Query {
    users(page: Int!): [User]
    user(id: ID!): User 
  }
`;
