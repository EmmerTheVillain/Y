// client/src/utils/mutations.js
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $username: String!, $email: String!, $password: String!) {
    addUser(name: $name, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TWEET = gql`
  mutation addTweet($tweetText: String!) {
    addTweet(tweetText: $tweetText) {
      _id
      tweetText
      tweetAuthor
      createdAt
      comments {
        _id
        commentText
      }
      likedBy {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($tweetId: ID!, $commentText: String!) {
    addComment(tweetId: $tweetId, commentText: $commentText) {
      _id
      tweetText
      tweetAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($tweetAuthor: String!) {
    followUser(tweetAuthor: $tweetAuthor) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;

export const LIKE_TWEET = gql`
mutation LikeTweet($tweetId: ID!) {
  likeTweet(tweetId: $tweetId) {
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

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput) {
    updateUser(id: $id, input: $input) {
      _id
      username
    }
  }
`;