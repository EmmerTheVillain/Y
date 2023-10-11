// client/src/utils/queries.js
import { gql } from '@apollo/client';

export const GET_TWEETS = gql`
  query GetTweets {
    getTweets {
      id
      text
      author
    }
  }
`;