// TweetForm.jsx

import React, { useState } from 'react';

function TweetForm({ onTweetSubmit }) {
  const [tweetText, setTweetText] = useState('');

  const handleTextChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweetText.trim() !== '') {
      onTweetSubmit(tweetText);
      setTweetText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          value={tweetText}
          onChange={handleTextChange}
        />
        <button type="submit">Tweet</button>
      </form>
    </div>
  );
}

export default TweetForm;
