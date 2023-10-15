import { useState, useEffect } from 'react'
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth'
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';
import MyTweetPage from './pages/MyTweetPage.jsx';
import SingleTweet from './pages/SingleTweet.jsx'

function App() {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    // Check if a JWT is present in local storage
    const token = localStorage.getItem('id_token');
    if (token) {
      // Decode the token to extract user data
      const decoded = Auth.getProfile(token);
      setCurrentUser(decoded);
    }
  }, []);


  return (
    <Router>
      <div className="app">
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
          <Route exact path="/" element={<Home currentUser={currentUser} />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profiles/:profileId" element={<Profile currentUser={currentUser}/>} />
          <Route exact path="/tweets/:tweetId" element={<SingleTweet />} />
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