export const authTypeDefs = `
  type User {
    id: ID
    email: String 
    username: String
  }
  input RegisterData {
    email: String!
    username: String!
    password: String!
  }
  input LoginData {
    username: String!
    password: String!
  }
  type Mutation {
    register (data: RegisterData): ID
    login (data: LoginData): ID
  }
`;
