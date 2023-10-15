// TweetList.jsx
import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FOLLOW_USER, LIKE_TWEET } from '../utils/mutations';

const TweetList = ({
  tweets,
  title,
  showTitle = true,
  showUsername = true,
  currentUser,
}) => {
  const [following, setFollowing] = useState([]);
  const [followUser] = useMutation(FOLLOW_USER);
  const [likeTweet] = useMutation(LIKE_TWEET);

  const handleFollow = async (tweetAuthor) => {
    try {
      // Execute the FOLLOW_USER mutation with the username
      const { data } = await followUser({
        variables: { currentUser: currentUser.username, tweetAuthor },
      });
      console.log(variables)
      // Update the 'following' state after a successful follow action
      if (data && data.followUser) {
        const userToFollow = data.followUser;
        // Update the 'following' state by adding the user to the list
        setFollowing([...following, userToFollow]);
      }
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      // Execute the LIKE_TWEET mutation with the tweetId
      const { data } = await likeTweet({
        variables: { tweetId },
      });
      console.log('data:', data);
    } catch (error) {
      console.error('Failed to like tweet:', error);
    }
  };
  
  if (!tweets.length) {
    return <h3>No Tweets Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      {tweets &&
        tweets.map((tweet) => (
          <div key={tweet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link
                className="text-light"
                to={`/profiles/${tweet.tweetAuthor}`}
              >
                {tweet.tweetAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this tweet on {tweet.createdAt}
                </span>
              </Link>
              {currentUser && currentUser.data && currentUser.data.username !== tweet.tweetAuthor && (
                // Render the Follow button if user is logged in and not the tweet author
                <button onClick={() => handleFollow(tweet.tweetAuthor)}>
                  Follow
                </button>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{tweet.tweetText}</p>
              {currentUser && tweet.likedBy && currentUser.data && !tweet.likedBy.some(user => user?._id === currentUser.data._id) && (
  // Render the Like button if user is logged in and hasn't liked the tweet
  <button onClick={() => {
    console.log('tweet.likedBy:', tweet.likedBy);
    console.log('currentUser.data._id:', currentUser.data._id);
    handleLike(tweet._id);
  }}>
    Like
  </button>
)}

            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/tweets/${tweet._id}`}
            >
              Join the discussion on this tweet.
            </Link>
          </div>
        ))}
    </div>
  );
};


export default TweetList;