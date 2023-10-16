// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from './UI/NavbarComponent.jsx';
import Auth from '../utils/auth.js';

function NavOutput() {
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  // Define the handleLogout function
  const handleLogout = () => {
    Auth.logout(); // Implement the logout logic using your authentication system
    window.location.reload(); // Reload the page after logout
  };
  
  const navigationLinks = [
    <Link key={1} className="nav-link text-light" to="/">
      Home
    </Link>,
    <Link key={2} className="nav-link text-light" to="/settings">
      Settings
    </Link>,
    <Link key={3} className="nav-link text-light" to="/tweet">
        New Tweet
    </Link>,
    <Link key={4} className="nav-link text-light" to="/profile">
      Profile
    </Link>,
    // Add more links as needed
  ];

  if (isLoggedIn) {
    navigationLinks.push(
      <button
        key={5}
        className="btn btn-link text-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  };
  return <NavbarComponent links={navigationLinks} />;
}

export default NavOutput;
