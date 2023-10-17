import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import TweetList from './components/TweetList.jsx';

<<<<<<< HEAD
function ProfileComponent() {
=======
const ProfileComponent = ({currentUser}) => {
  const { profileId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: profileId },
  });

  const profile = data?.user || {};
>>>>>>> 08ebd4f2415cd6ef6794dc3f46f2d93cad20dd63
  return (
    <Card >
   
      <Card.Body>
        <Card.Title>{profile.username}</Card.Title>
        <Card.Text>
        <TweetList tweets={profile.tweets || []} title="Tweets" showUsername={true} currentUser={currentUser} />
        </Card.Text>
        {/* <Button variant="primary">add friend</Button>   */}
          {/* <Card.Img variant="top" src={User.avatar} /> */}
        
      </Card.Body>
    </Card>
  );
}

export default ProfileComponent;