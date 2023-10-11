// client/src/utils/mutations.js
import { gql } from '@apollo/client';

export const CREATE_TWEET = gql`
  mutation CreateTweet($text: String!) {
    createTweet(text: $text) {
      id
      text
      author
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      username
    }
  }
`;