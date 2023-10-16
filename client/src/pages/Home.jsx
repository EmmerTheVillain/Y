<<<<<<< Updated upstream
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tweet from '../components/Tweet';
=======
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Login from '../components/Login.jsx';
import GetTweets from '../components/UI/GetTweets.jsx'
import TweetList from '../components/TweetList';
import TweetForm from '../components/UI/TweetForm.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_TWEETS } from '../utils/queries';

const Home = ({ currentUser }) => {
  const isLoggedIn = currentUser.data;
>>>>>>> Stashed changes

function Home() {
  return (
    <Container>
<<<<<<< Updated upstream
      <Row className="home">
        <Col md={{ span: 6, offset: 3 }}>{
          <h1>Welcome to y?</h1>
        }
        </Col>
        <Tweet />
      </Row>
=======
    <Row className="home">
      <Col>
      <h1>Welcome to y?</h1>
      {isLoggedIn ? (
        // Render content for a logged-in user (e.g., user profile)
        <>
          {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
            <TweetForm />
          </div>
            <GetTweets currentUser={currentUser} /> */}
        </>
      ) : (
        // Render the Login component for users who are not logged in
        <Login />
      )}
      </Col>
      <GetTweets currentUser={currentUser} />
    </Row>
>>>>>>> Stashed changes
    </Container>
  );
}


export default Home;