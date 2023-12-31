// In your Nav.jsx or any other component where you want to use the Navbar
import React from 'react';
import Navbar from './Navbar';

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
