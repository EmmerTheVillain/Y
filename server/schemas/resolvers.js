const tweets = []; // In-memory storage for tweets

const resolvers = {
  Query: {
    getTweets: () => tweets,
  },
  Mutation: {
    createTweet: (_, { text }) => {
      const newTweet = {
        id: String(tweets.length + 1),
        text,
        author: 'SampleUser', // Replace with actual user info
      };
      tweets.push(newTweet);
      return newTweet;
    },
  },
};

module.exports = resolvers;
