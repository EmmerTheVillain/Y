// server/schemas/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Tweet {
    _id: ID!
    text: String!
    author: String!
  }

  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String
    role: String
    avatar: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    getTweets: [Tweet]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createTweet(text: String!): Tweet
    login(email: String!, password: String!): Auth
  }

  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;

