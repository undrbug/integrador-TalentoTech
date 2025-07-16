import { Container } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/bienhelada",
    icon: <FaFacebook />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/bienhelada",
    icon: <FaInstagram />,
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/bienhelada",
    icon: <FaTwitter />,
  },
];

const Footer = () => (
  <footer className="footer bg-dark text-light py-4 mt-auto">
    <Container className="text-center">
      <div className="mb-2">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light fs-4 mx-2"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="mb-0 small">
        © {new Date().getFullYear()} BienHelada.com.ar - Todos los derechos reservados.
      </p>
    </Container>
  </footer>
);

export default Footer;
