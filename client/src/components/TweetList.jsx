// TweetList.jsx
import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FOLLOW_USER, LIKE_TWEET } from '../utils/mutations';
import FollowButton from './UI/FollowButton.jsx';

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
       {showTitle && <h3>{/*{title}*/}Tweets:</h3>} 

      {tweets &&
  tweets.map((tweet) => (
    <div key={tweet._id} className="card mb-3 p-3">
      <h4 className="card-header bg-secondary text-light p-2 m-0">
        <Link className="text-dark" to={`/profiles/${tweet.tweetAuthor}`}>
          {tweet.tweetAuthor} <br />
          <span style={{ fontSize: '1rem' }}>
            tweeted {tweet.createdAt}
          </span>
        </Link>
        {/* {currentUser && currentUser.data && currentUser.data.username !== tweet.tweetAuthor && (
          // Render the Follow button if user is logged in and not the tweet author
       <FollowButton tweet={tweet}/>
        )} */}
      </h4>
      <div className="card-body bg-light p-2">
        <p>{tweet.tweetText}</p>
        <div>
          {/* Like button and counter */}
          {currentUser && tweet.likedBy && currentUser.data && !tweet.likedBy.some(user => user?._id === currentUser.data._id) && (

          <button onClick={() => handleLike(tweet._id)}>Like</button>)}
    {tweet.likedBy && tweet.likedBy.length > 0 && (
      <span> Likes: {tweet.likedBy.length}</span>
    )}
        </div>
      </div>
      <Link
        className="btn btn-dark btn-block btn-squared"
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