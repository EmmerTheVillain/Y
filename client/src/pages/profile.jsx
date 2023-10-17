// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../utils/queries'; // Import your GraphQL query
import { useQuery } from '@apollo/client';
import TweetList from '../components/TweetList';

const Profile = ({currentUser}) => {
  const { profileId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: profileId },
  });
 console.log('currentUser:', currentUser)
 console.log('profileId:', profileId)
  const profile = data?.user || {};
  
  const renderSettingsButton = currentUser.data.username === profileId ? (
    <Link to="/settings">
      <button className="settingsButton">Account Settings</button>
    </Link>
  ) : null;

  return (
    <div>
      <h1>{profile.username}'s Profile</h1>
      {renderSettingsButton}
      <TweetList tweets={profile.tweets || []} title="Tweets" showUsername={true} currentUser={currentUser} />
    </div>
  );
};

export default Profile;