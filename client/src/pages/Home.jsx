import React, { useState, useEffect } from 'react';
import Login from '../components/Login.jsx';
import GetTweets from '../components/UI/GetTweets.jsx'
import TweetList from '../components/TweetList';
import TweetForm from '../components/UI/TweetForm.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_TWEETS } from '../utils/queries';

const Home = ({ currentUser }) => {
  const isLoggedIn = currentUser.data;

  return (
    <div className="home">
      <h1>Welcome to y?</h1>
      {isLoggedIn ? (
        // Render content for a logged-in user (e.g., user profile)
        <>
          <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
            <TweetForm />
          </div>
            <GetTweets currentUser={currentUser} />
        </>
      ) : (
        // Render the Login component for users who are not logged in
        <Login />
      )}
    </div>
  );
};

export default Home;
