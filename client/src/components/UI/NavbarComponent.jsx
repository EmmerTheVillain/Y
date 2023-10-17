import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent({ links }) {
  return (
    <>
      <Navbar fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
        <Link to="/" className="navbar-brand">Y?</Link>
          <Nav className="justify-content-end">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((link) => link)}
            </ul>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

// export default ColorSchemesExample;
