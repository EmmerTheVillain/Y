// server/schemas/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String
    tweets: [Tweet]!

  }

    type Tweet {
      _id: ID
      tweetText: String
      tweettAuthor: String
      createdAt: String
      comments: [Comment]!
    }
  
    type Comment {
      _id: ID
      commentText: String
      commentAuthor: String
      createdAt: String
    }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    users: [User]
    tweets(username: String): [Tweet]
    tweet(tweetId: ID!): Tweet
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

