// server/schemas/typeDefs.js
const typeDefs = `
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    tweets: [Tweet]!
    following: [User]
    followers: [User]
    likes: [Tweet]
  }

  type Tweet {
    _id: ID
    tweetText: String
    tweetAuthor: String
    createdAt: String
    comments: [Comment]!
    likedBy: [User]
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
    user(username: String!): User
    tweets(username: String): [Tweet]
    tweet(tweetId: ID!): Tweet
    me: User  
    following(username: String!): [User]
    isFollowingUser(username: String!): Boolean
    likedBy(tweetId: ID!): [User]
  }

  type Mutation {
    addUser(name: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTweet(tweetText: String!): Tweet
    addComment(tweetId: ID!, commentText: String!): Tweet
    removeTweet(tweetId: ID!): Tweet
    removeComment(tweetId: ID!, commentId: ID!): Tweet
    followUser(tweetAuthor: String!): User
    unfollowUser(currentUser: String! tweetAuthor: String!): User
    likeTweet(tweetId: ID!): Tweet
    updateUser(id: ID!, input: UpdateUserInput): User
    deleteUser(id: ID!): User
  }


input UpdateUserInput {
  name: String
  username: String
  password: String
}
`
module.exports = typeDefs;
