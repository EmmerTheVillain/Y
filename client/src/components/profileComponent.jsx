import Card from 'react-bootstrap/Card';
// import User from '../../../server/models/User';

  function ProfileComponent() {
  return (
    <Card >
   
      <Card.Body>
        {/* <Card.Title>{User.username}</Card.Title> */}
        <Card.Text>
          
        </Card.Text>
        
        <Button variant="primary">add friend</Button>  
          {/* <Card.Img variant="top" src={User.avatar} /> */}
        
      </Card.Body>
    </Card>
  );
}

export default ProfileComponent;