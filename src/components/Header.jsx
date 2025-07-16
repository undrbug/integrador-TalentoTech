import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { isAuthenticated, logout, user, loading } = useAuth();
  if (loading) return null; 

  // Clase para subrayar el link activo
  const getActiveClass = ({ isActive }) =>
    isActive ? 'nav-link active fw-bold text-decoration-underline' : 'nav-link';

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className='radius'>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <picture>
              <img src="/LogoBienHelada.jpg" alt="BienHelada Logo" className="logo" />
            </picture>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="justify-content-end flex-grow-1">
              <NavLink to="/contact" className={getActiveClass}>
                Contacto
              </NavLink>
              <NavLink to="/about" className={getActiveClass}>
                Acerca de
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/deals" className={getActiveClass}>
                    Ofertas
                  </NavLink>

                  {user?.role === 'admin' && (
                    <NavLink to="/dashboard" className={getActiveClass}>
                      Dashboard
                    </NavLink>
                  )}

                  <Nav.Link as="button" onClick={logout} className="nav-link">
                    Cerrar Sesión
                  </Nav.Link>
                </>
              ) : (
                <NavLink to="/login" className={getActiveClass}>
                  Iniciar Sesión
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
