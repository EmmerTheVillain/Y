import React, { useState, useEffect } from 'react';
import Login from '../components/Login.jsx';
import Profile from '../components/Profile.jsx'
import Auth from '../utils/auth'; // Import your authentication utility

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the user's authentication status when the component is mounted
    const isAuthenticated = Auth.loggedIn(); // Replace with your actual authentication check

    // Update the state based on the authentication status
    setIsLoggedIn(isAuthenticated);
  }, []);

  return (
    <div className="home">
      <h1>Welcome to y?</h1>
      {isLoggedIn ? (
        // Render content for a logged-in user (e.g., user profile)
        <Profile />
      ) : (
        // Render the Login component for users who are not logged in
        <Login />
      )}
    </div>
  );
}

export default Home;
