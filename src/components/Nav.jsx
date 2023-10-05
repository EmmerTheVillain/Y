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
    // Add more links as needed
  ];

  return <Navbar links={navigationLinks} />;
}

export default Nav;
