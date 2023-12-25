export const authTypeDefs = `
  type User {
    id: ID
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

  type Query {
    myAuth: User 
  }
  type Mutation {
    register (data: RegisterData): ID
    login (data: LoginData): ID
  }
`;
