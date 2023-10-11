import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
  function Yeet() {
    // return (
    //   <div style={styles.card}>
    //     <div style={styles.heading}>{/*username?*/}</div>
    //     <div style={styles.content}>{/*Yeet content*/}
    //     </div>
    //   </div>
    // );
  // }
  
  return (
    <Card style={{ width: '18rem' }}>
   
      <Card.Body>
        <Card.Title>username</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
        <Button variant="primary">Go somewhere</Button>  
        {/* truthy for if there is an image on the tweet to render image*/}
          <Card.Img variant="top" src="holder.js/100px180" />
        
      </Card.Body>
    </Card>
  );
}

export default Yeet;