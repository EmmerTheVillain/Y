import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from '@apollo/client';

import TweetList from '../components/TweetList';

import { QUERY_TWEETS } from '../utils/queries';
import Login from '../components/Login'
import GetTweets from '../components/UI/GetTweets.jsx'
import TweetForm from '../components/UI/TweetForm.jsx';
import Tweet from '../components/Tweet';

const Home = ({ currentUser }) => {
  const isLoggedIn = currentUser.data;
  return (
    <Container>
      <Row className="home">
        <Col md={{ span: 6, offset: 3 }}>{
          <h1>Welcome to y?</h1>
        }
        </Col>
        {isLoggedIn ? (
        // Render content for a logged-in user (e.g., user profile)
        <>
          <div className="col-12 col-md-10 mb-3 p-3" style={{ border: '1px dotted #1a1a1a' }}>
            <TweetForm />
          </div>
            <GetTweets currentUser={currentUser} />
        </>
      ) : (
        // Render the Login component for users who are not logged in
        <Login />
      )}
      </Row>
    </Container>
  );
}


export default Home;