// src/components/Nav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarComponent from './UI/NavbarComponent.jsx';
import Auth from '../utils/auth.js';

function NavOutput({currentUser}) {
  const navigate = useNavigate();
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in
  // Define the handleLogout function
  const handleLogout = () => {
    Auth.logout(); // Implement the logout logic using your authentication system
    navigate('/') // Return to home page
  };
  
  const navigationLinks = [
    <Link key={1} className="nav-link text-light" to="/">
      Home
    </Link>,
    // Add more links as needed
  ];

  if (isLoggedIn) {
    navigationLinks.push(
      <Link key={4} className="nav-link text-light" to={`/profiles/${currentUser.data.username}`}>
      My Profile
    </Link>,
      <button
        key={5}
        className="btn btn-link text-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  };

  if (!isLoggedIn) {
    navigationLinks.push(
      <Link key={2} style={{ backgroundColor: 'green' }}className="nav-link text-light" to={`/signup/`}>
      New Account Signup
    </Link>,
    )
  }
  return <NavbarComponent links={navigationLinks} />;
}

export default NavOutput;
