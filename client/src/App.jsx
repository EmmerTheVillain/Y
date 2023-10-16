import { useState } from 'react'
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

<<<<<<< Updated upstream
import NavOutput from './components/NavOutput.jsx'
=======
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth'
import NavOutput from './components/NavOutput.jsx';
>>>>>>> Stashed changes
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx'
import MyTweetPage from './pages/MyTweetPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <Router>
      <Container fluid className="app">
        <Row className="justify-content-center">
          <header>
            <NavOutput />
          </header>
        </Row>
        <Row  className="">
          <Col className="bg-light border"
      sm={{
        offset: 5,
        order: 2,
        size: 4
      }}>
<<<<<<< Updated upstream
          <main>
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/tweet" element={<MyTweetPage />} />
            <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </main>
          </Col>
          {/* <Col>
          <Sidebar />
          </Col> */}
        </Row>
        <Row className="bg-light"
      sm={{
        offset: 1,
        order: 1,
        size: 3
      }}>
          <footer>
            {/* Add footer here */}
          </footer>
        </Row>
=======
        <main>
          <Routes>
          <Route exact path="/" element={<Home currentUser={currentUser} />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profiles/:profileId" element={<Profile currentUser={currentUser}/>} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/tweets/:tweetId" element={<SingleTweet />} />
          </Routes>
        </main>
        </Col>
        </Row>
        <footer>
          {/* Add footer here */}
        </footer>
>>>>>>> Stashed changes
      </Container>
    </Router>
    
  );
}

export default App;
