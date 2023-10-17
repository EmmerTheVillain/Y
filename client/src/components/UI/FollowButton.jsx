// FollowButton.jsx
import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'

const FollowButton = ({
  tweet,
  title,
  showTitle = true,
  showUsername = true,
  currentUser,
}) => {
  const [following, setFollowing] = useState([]);
  const [followUser] = useMutation(FOLLOW_USER);

  const handleFollow = async ( tweetAuthor) => {
    if (Auth.loggedIn()) {
    try {
      // Execute the FOLLOW_USER mutation with the username
      const { data } = await followUser({
        variables: { tweetAuthor },
      });
      // Update the 'following' state after a successful follow action
      if (data && data.followUser) {
        const userToFollow = data.followUser;
        // Update the 'following' state by adding the user to the list
        setFollowing([...following, userToFollow]);
      }
    } catch (error) {
      console.error('Failed to follow user:', error);
    }}
  };

    return (
    <div>
      <h4 className="card-header bg-secondary text-light p-2 m-0">
{
          // Render the Follow button if user is logged in and not the tweet author
          <button onClick={() => handleFollow(tweet.tweetAuthor)}>
            Follow
          </button>
}
      </h4>
</div>
  );
};


export default FollowButton;