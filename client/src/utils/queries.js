import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      tweets {
        _id
        tweetText
        tweetAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_TWEETS = gql`
  query getTweets {
    tweets {
      _id
      tweetText
      tweetAuthor
      createdAt
      likedBy {
        _id
      }
    }
  }
`;

export const QUERY_SINGLE_TWEET = gql`
  query getSingleTweet($tweetId: ID!) {
    tweet(tweetId: $tweetId) {
      _id
      tweetText
      tweetAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      tweets {
        _id
        tweetText
        tweetAuthor
        createdAt
      }
    }
  }
`;

export const IS_FOLLOWING_USER = gql`
  query isFollowingUser($username: String!) {
    isFollowingUser(username: $username)
  }
`;
