import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './ui/Navbar.jsx';
import Auth from '../utils/auth';

function Nav() {
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  // Define the handleLogout function
  const handleLogout = () => {
    Auth.logout(); // Implement the logout logic using your authentication system
    window.location.reload(); // Reload the page after logout
  };

  // links that will always display
  const navigationLinks = [
    <Link key={1} className="nav-link text-light" to="/">
      Home
    </Link>,
    <Link key={2} className="nav-link text-light" to="/about">
      About Us
    </Link>,
    // <Link key={3} className="nav-link text-light" to="/tweet">
    //   Tweet
    // </Link>,

    // Add more links as needed
  ];

// links if the user is logged out
  if (!isLoggedIn) {
    navigationLinks.push(
      <Link key={4} className="nav-link text-light" to="/signup">
      New User Signup
    </Link>,
    )};

  // links if the user is logged in
  if (isLoggedIn) {
    navigationLinks.push(
      <Link key={6} className="nav-link text-light" to="/settings">
      Settings
    </Link>,
      <button
        key={5}
        className="btn btn-link text-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }

  return <Navbar links={navigationLinks} />;
}

export default Nav;
