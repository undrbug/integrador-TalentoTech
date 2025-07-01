import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className='radius'>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <picture>
              <img src="/LogoBienHelada.jpg" alt="BienHelada Logo" className="logo" />
            </picture>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
              <Nav.Link as={Link} to="/about">Acerca de</Nav.Link>

              {isAuthenticated ? (
                <>
                  {/* <Nav.Link as={Link} to="/shop">Tienda</Nav.Link> */}
                  <Nav.Link as={Link} to="/deals">Ofertas</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
