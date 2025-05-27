import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg" className='radius'>
      <Container>
        <Navbar.Brand href="#">MiApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#features">Características</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
