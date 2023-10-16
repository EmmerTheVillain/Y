import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from '@apollo/client';

import TweetList from '../components/TweetList';

import { QUERY_TWEETS } from '../utils/queries';
import Login from '../components/Login'
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
        <Tweet />
        ) : (
          <Login />
        )}
      </Row>
    </Container>
  );
}


export default Home;