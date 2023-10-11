import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent({ links }) {
  return (
//     <nav className="navbar navbar-expand-lg bg-secondary">
//       <div className="container-fluid">
//         <div className="collapse navbar-collapse row" id="navbarSupportedContent">
          
//         </div>
//       </div>
//     </nav>
//   );
// }


// function ColorSchemesExample() {
//   return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
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
