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