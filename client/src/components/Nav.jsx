// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './ui/Navbar.jsx';

function Nav() {
  const navigationLinks = [
    <Link key={1} className="nav-link text-light" to="/">
      Home
    </Link>,
    <Link key={2} className="nav-link text-light" to="/about">
      About Us
    </Link>,
    <Link key={3} className="nav-link text-light" to="/tweet">
        Tweet
      </Link>,
    <Link key={4} className="nav-link text-light" to="/signup">
          New User Signup
        </Link>,
    // Add more links as needed
  ];

  return <Navbar links={navigationLinks} />;
}

export default Nav;
