import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="container mt-5">
        <h1>Contacto</h1>
        <p>Para consultas, por favor envíanos un correo a: <a href="mailto:contacto@bienhelada.com.ar">contacto@bienhelada.com.ar</a></p>
        <p>O llámanos al: <a href="tel:+54123456789">+54 123 456 789</a></p>
        <p>También puedes seguirnos en nuestras redes sociales:</p>
        <ul className="list-unstyled d-flex flex-column gap-2">
            <li><a href="https://www.facebook.com/bienhelada" target="_blank" rel="noopener noreferrer"><FaFacebook /> </a></li>
            <li><a href="https://www.instagram.com/bienhelada" target="_blank" rel="noopener noreferrer"><FaInstagram /> </a></li>
            <li><a href="https://www.twitter.com/bienhelada" target="_blank" rel="noopener noreferrer"><FaTwitter /> </a></li>
        </ul>
    </div>
  );
}

export default Contact;
