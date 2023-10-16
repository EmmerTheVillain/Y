import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tweet from '../components/Tweet';
import ProfileComponent from '../components/profileComponent';

const Profile = ({currentUser}) => {
  const { profileId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: profileId },
  });

  const profile = data?.user || {};
  return (
    <Container>
      <Row className="home">
        <Col md={{ span: 6, offset: 3 }}>{
          <ProfileComponent />
        }
        </Col>
        {/* <TweetList tweets={profile.tweets || []} title="Tweets" showUsername={true} currentUser={currentUser} /> */}

        <Tweet />
      </Row>
    </Container>
  );
}


export default Profile;