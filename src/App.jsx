import { useState } from 'react'
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <footer>
          {/* Add footer here */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
