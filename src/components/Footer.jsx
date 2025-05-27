import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className=" footer bg-dark text-light py-3 mt-auto">
    <Container className="text-center">
      <p className="mb-0">© {new Date().getFullYear()} BienHelada.com.ar - Todos los derechos reservados.</p>
    </Container>
  </footer>
);

export default Footer;
