// server/schemas/resolvers.js
const { Tweet, User } = require('../models/');

const resolvers = {
  Query: {
    getTweets: async () => {
      try {
        const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(10); // Fetch the last 10 tweets
        return tweets;
      } catch (error) {
        throw new Error('Failed to fetch tweets');
      }
    },
  },
  Mutation: {
    createUser: async (_, { input } ) => {
      try {
        const user = new User(input);
        await user.save();
        return user;
      } catch (error) {
        throw new Error("User creation failed: " + error.message);
      }
    },
    createTweet: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error('Authentication required to create a tweet');
      }
  
      try {
        const newTweet = new Tweet({
          text,
          author: user.id,
        });

        await newTweet.save();
  
        return newTweet;
      } catch (error) {
        throw new Error('Failed to create a tweet');
      }
    },
  },
};  

module.exports = resolvers;
