import { Button } from 'react-bootstrap';
import { FaRocket, FaShoppingCart, FaUsers, FaBolt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <FaRocket size={48} className="text-primary mb-3" />
        <h1 className="fw-bold display-4">BienHelada.com.ar</h1>
        <p className="lead mx-auto" style={{ maxWidth: 600 }}>
          Somos una plataforma de e-commerce creada para que tu experiencia de compra sea <span className="text-primary fw-semibold">fácil</span>, <span className="text-success fw-semibold">segura</span> y <span className="text-warning fw-semibold">divertida</span>. 
          Nos apasiona la tecnología y el servicio al cliente, y trabajamos cada día para ofrecerte las mejores ofertas y productos.
        </p>
      </div>
      <div className="row text-center g-4 mb-5">
        <div className="col-md-4">
          <div className="p-4 shadow rounded bg-light h-100">
            <FaShoppingCart size={36} className="text-success mb-2" />
            <h4 className="fw-bold text-dark">Compra Inteligente</h4>
            <p className='text-dark'>Explorá cientos de productos, encontrá ofertas exclusivas y gestioná tu carrito de manera simple y rápida.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 shadow rounded bg-light h-100">
            <FaUsers size={36} className="text-info mb-2" />
            <h4 className="fw-bold text-dark">Comunidad</h4>
            <p className='text-dark'>Formá parte de una comunidad que valora la confianza, la transparencia y la innovación en cada compra.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 shadow rounded bg-light h-100">
            <FaBolt size={36} className="text-warning mb-2" />
            <h4 className="fw-bold text-dark">Tecnología Ágil</h4>
            <p className='text-dark'>Desarrollado con las últimas tecnologías para brindarte velocidad, seguridad y una experiencia moderna.</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h5 className="fw-bold mb-3">¿Listo para vivir la mejor experiencia de compra?</h5>
        <Link to="/" className="btn btn-primary btn-lg shadow-sm">Ir a la tienda</Link>
      </div>
    </section>
  );
}

export default About;
