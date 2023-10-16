// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from './UI/NavbarComponent.jsx';

function NavOutput() {
  const navigationLinks = [
    <Link key={1} className="nav-link text-light" to="/">
      Home
    </Link>,
    <Link key={2} className="nav-link text-light" to="/about">
      About Us
    </Link>,
    <Link key={3} className="nav-link text-light" to="/tweet">
        New Tweet
    </Link>,
    <Link key={3} className="nav-link text-light" to="/profile">
      Profile
    </Link>,
    // Add more links as needed
  ];

  return <NavbarComponent links={navigationLinks} />;
}

export default NavOutput;
