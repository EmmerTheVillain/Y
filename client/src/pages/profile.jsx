// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../utils/queries'; // Import your GraphQL query
import { useQuery } from '@apollo/client';
import TweetList from '../components/TweetList';

const Profile = ({currentUser}) => {
  const { profileId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: profileId },
  });

  const profile = data?.user || {};

  return (
    <div>
      <h1>{profile.username}'s Profile</h1>
      <TweetList tweets={profile.tweets || []} title="Tweets" showUsername={true} currentUser={currentUser} /> {/* Always show the username */}
    </div>
  );
};

export default Profile;