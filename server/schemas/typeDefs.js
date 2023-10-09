const { gql } = require('apollo-server');

const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
    author: String!
  }

  type Query {
    getTweets: [Tweet]
  }

  type Mutation {
    createTweet(text: String!): Tweet
  }
`;

module.exports = typeDefs;
