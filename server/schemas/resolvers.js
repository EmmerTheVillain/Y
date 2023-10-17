// server/schemas/resolvers.js
const { User, Tweet } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError, UserInputError } = require('apollo-server');
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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tweets');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    likedBy: async (parent) => {
      // Logic to fetch and return the users who liked this tweet
      return User.find({ _id: { $in: parent.likedBy } });
    },
    following: async (parent, { username }, context) => {
      if (context.user) {
        // Fetch the users that the current user is following
        return User.find({ _id: context.user.following });
      }
      throw new AuthenticationError('You need to be logged in to view your following.');
    },
    isFollowingUser: async (parent, { username }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to perform this action.');
      }
    
      // Get the currently logged-in user
      const currentUser = context.user;
    
      // Find the user that the current user is following
      const userToCheck = await User.findOne({ username });
    
      if (!userToCheck) {
        throw new UserInputError('User not found.');
      }
    
      // Check if the user is in the following list of the current user
      return currentUser.following.includes(userToCheck._id);
    }
  },

  Mutation: {
    addUser: async (parent, { name, username, email, password }) => {
      const user = await User.create({ name, username, email, password });
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
    addTweet: async (parent, { tweetText }, context) => {
      if (context.user) {
        const tweet = await Tweet.create({
          tweetText,
          tweetAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tweets: tweet._id } }
        );

        return tweet;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { tweetId, commentText }, context) => {
      if (context.user) {
        return Tweet.findOneAndUpdate(
          { _id: tweetId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    updateUser: async (_, { id, input }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to perform this action.');
      }
    
      try {
        // Find the user by ID
        const userToUpdate = await User.findById(id);
    
        if (!userToUpdate) {
          throw new UserInputError('User not found.');
        }
    
        // Check if the user is authorized to update this user's information
        if (userToUpdate._id.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized to update this user.');
        }
    
        // Update the user fields if they exist in the input
        if (input.name) {
          userToUpdate.name = input.name;
        }
        if (input.username) {
          const oldUsername = userToUpdate.username;
          userToUpdate.username = input.username;
    
          // Update tweetAuthor in all tweets by the user
          await Tweet.updateMany(
            { tweetAuthor: oldUsername },
            { $set: { tweetAuthor: input.username } }
          );
    
          // Update commentAuthor in all comments by the user
          await Tweet.updateMany(
            { 'comments.commentAuthor': oldUsername },
            { $set: { 'comments.$.commentAuthor': input.username } }
          );
        }
        if (input.password) {
          userToUpdate.password = input.password;
        }
    
        // Save the updated user
        await userToUpdate.save();
    
        return userToUpdate;
      } catch (error) {
        throw new ApolloError('Failed to update user', error);
      }
    },
    deleteUser: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to delete your account.');
      }
  
      try {
        // Delete the user
        const deletedUser = await User.findByIdAndDelete(id);
  
        if (!deletedUser) {
          throw new UserInputError('User not found.');
        }
  
        // Delete all tweets authored by the user
        await Tweet.deleteMany({ tweetAuthor: deletedUser.username });
  
        // Remove the user's _id from the likedBy field in all tweets
        await Tweet.updateMany({}, { $pull: { likedBy: id } });
  
        return deletedUser;
      } catch (error) {
        throw new ApolloError('Failed to delete user', error);
      }
    },
    removeTweet: async (parent, { tweetId }, context) => {
      if (context.user) {
        const tweet = await Tweet.findOneAndDelete({
          _id: tweetId,
          tweetAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tweets: tweet._id } }
        );

        return tweet;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { tweetId, commentId }, context) => {
      if (context.user) {
        return Tweet.findOneAndUpdate(
          { _id: tweetId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    followUser: async (_, { tweetAuthor }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to perform this action.');
      }
    
      try {
        // Find the user that the current user wants to follow
        const userToFollow = await User.findOne({ username: tweetAuthor });
        
        if (!userToFollow) {
          throw new UserInputError('User not found.');
        }
    
        // Check if the current user is already following the userToFollow
        if (userToFollow.followers.includes(context.user._id)) {
          throw new UserInputError('You are already following this user.');
        }
    
        // Add the current user to the followers of the userToFollow
        userToFollow.followers.push(context.user._id);
        await userToFollow.save();
    
        // Add the userToFollow to the following list of the current user
        context.user.following.push(userToFollow._id);
        await context.user.save();
    
        return userToFollow;
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    unfollowUser: async (_, { username }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError;
      }

      try {
        const userToUnfollow = await User.findOne(username);
        if (!userToUnfollow) {
          throw new UserInputError('User not found.');
        }

        // Remove the user from the followers list
        context.user.following = context.user.following.filter(
          (user) => user.toString() !== username
        );
        await context.user.save();

        return userToUnfollow;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    likeTweet: async (_, { tweetId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to like a tweet.');
      }
    
      try {
        // Find the tweet by ID
        const tweet = await Tweet.findById(tweetId);
    
        if (!tweet) {
          throw new UserInputError('Tweet not found.');
        }
    
        // Check if the user has already liked the tweet
        if (tweet.likedBy.includes(context.user._id)) {
          throw new UserInputError('You have already liked this tweet.');
        }
    
        // Add the user's ID to the likedBy array and save the tweet
        tweet.likedBy.push(context.user._id);
        await tweet.save();
    
        return tweet;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Tweet: {
    likedBy: async (parent) => {
      return parent.likedBy; // Simply return the likedBy array from the Tweet model.
    },
  },
};


module.exports = resolvers;
