// Example of using the TweetForm component
import React from 'react';
import TweetForm from '../components/UI/TweetForm.jsx';

function MyTweetPage() {
    const handleTweetSubmit = (tweetText) => {
        // Make an HTTP POST request to your server to create a new tweet
        fetch('/api/tweets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: tweetText }),
        })
          .then((response) => {
            if (response.ok) {
              // Tweet submitted successfully
              console.log('Tweet submitted:', tweetText);
            } else {
              // Handle error (e.g., display an error message to the user)
              console.error('Failed to submit tweet');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

  return (
    <div>
      <h1>Compose a Tweet</h1>
      <TweetForm onTweetSubmit={handleTweetSubmit} />
    </div>
  );
}

export default MyTweetPage;
