import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import { toast } from 'react-toastify';

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

const Contact = () => {
  return (
    <section className="container py-5">
      <div className="row justify-content-center align-items-center g-5">
        <div className="col-md-6">
          <h2 className="mb-4 fw-bold">¿Querés contactarnos?</h2>
          <p className="lead">
            Estamos para ayudarte. Escribinos o llamanos y te responderemos lo antes posible.
          </p>
          <div className="mb-3 d-flex align-items-center gap-2">
            <FaEnvelope className="text-primary" />
            <a href="mailto:contacto@bienhelada.com.ar" className="text-decoration-none">
              contacto@bienhelada.com.ar
            </a>
          </div>
          <div className="mb-4 d-flex align-items-center gap-2">
            <FaPhone className="text-primary" />
            <a href="tel:+54123456789" className="text-decoration-none">
              +54 123 456 789
            </a>
          </div>
          <div>
            <span className="fw-semibold">Seguinos:</span>
            <ul className="list-inline mt-2 mb-0">
              {socialLinks.map((link) => (
                <li className="list-inline-item me-3" key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fs-4 text-dark"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <form
            className="bg-light p-4 rounded shadow-sm"
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              toast.success('¡Gracias por tu mensaje! Pronto nos pondremos en contacto.', {
                position: "bottom-center",
                autoClose: 2000,
                pauseOnHover: false,
                theme: "light"
              });
              e.target.reset();
            }}
          >
            <h4 className="mb-3 text-dark">Envíanos un mensaje</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-dark">Nombre</label>
              <input type="text" className="form-control" id="name" required minLength={2} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark">Correo electrónico</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label text-dark">Mensaje</label>
              <textarea className="form-control" id="message" rows="4" required minLength={10}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
