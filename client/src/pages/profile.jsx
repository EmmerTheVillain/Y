import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tweet from '../components/Tweet';
import ProfileComponent from '../components/profileComponent';

function Profile() {
  return (
    <Container>
      <Row className="home">
        <Col md={{ span: 6, offset: 3 }}>{
          <ProfileComponent />
        }
        </Col>
        <Tweet />
      </Row>
    </Container>
  );
}


export default Profile;