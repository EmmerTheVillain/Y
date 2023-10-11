// server/schemas/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
    author: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
  }

  type Auth {
    token: String
    user: User
  }
  
  type Query {
    getTweets: [Tweet]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createTweet(text: String!): Tweet
  }

  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;

