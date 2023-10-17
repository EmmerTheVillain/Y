import { useState, useEffect, React } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import Auth from './utils/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavOutput from './components/NavOutput.jsx'
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx'
import Settings from './pages/Settings.jsx'
import Signup from './pages/Signup.jsx';
import SingleTweet from './pages/SingleTweet.jsx'
// import Sidebar from './components/Sidebar.jsx';
import Profile from './pages/profile.jsx';

function App() {
  // Initialize the currentUser state from local storage
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      const decoded = Auth.getProfile(token);
      return decoded;
    }
    return {};
  });

  // Add an effect to update currentUser when the token changes
  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      const decoded = Auth.getProfile(token);
      setCurrentUser(decoded);
    } else {
      setCurrentUser({}); // Clear currentUser when the token is removed (e.g., on logout)
    }
  }, []);
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
          <main>
          <Routes>
          <Route exact path="/" element={<Home currentUser={currentUser} />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profiles/:profileId" element={<Profile currentUser={currentUser}/>} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/tweets/:tweetId" element={<SingleTweet />} />
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
      </Container>
    </Router>
  );
}

export default App;
