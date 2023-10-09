import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TWEETS } from '../utils/queries.js'
import { CREATE_TWEET } from '../utils/mutations.js'

function MyTweetPage() {
  const [tweetText, setTweetText] = useState('');
  const { loading, error, data } = useQuery(GET_TWEETS);
  const [createTweet] = useMutation(CREATE_TWEET);

  const handleTweetSubmit = async () => {
    try {
      const response = await createTweet({ variables: { text: tweetText } });
      const newTweet = response.data.createTweet;
      console.log('Tweet submitted:', newTweet);
      // Optionally, refetch tweets to update the list
    } catch (error) {
      console.error('Failed to submit tweet:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Compose a Tweet</h1>
      <textarea
        rows="4"
        placeholder="What's on your mind?"
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
      />
      <button onClick={handleTweetSubmit}>Tweet</button>

      <h2>Tweets</h2>
      <ul>
        {data.getTweets.map((tweet) => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyTweetPage;
