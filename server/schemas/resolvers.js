const { User, Tweet } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('tweets');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('tweets');
    },
    tweets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Tweet.find(params).sort({ createdAt: -1 });
    },
    tweet: async (parent, { tweetId }) => {
      return Tweet.findOne({ _id: tweetId });
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
