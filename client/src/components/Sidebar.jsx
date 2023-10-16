import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Sidebar() {
  return (
    <Sidebar defaultActiveKey="/home" className="flex-column">
          {links.map((link) => link)}
    </Sidebar>
  );
}

export default Sidebar;