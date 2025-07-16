import { Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useProductos } from './ProductContext';
import { useCart } from './CartContext';
import { HeartFill } from 'react-bootstrap-icons';
import { useState, useRef, useEffect } from 'react';

const CardComponent = ({ products }) => {
  const { productos, loading } = useProductos();
  const { onAddToCart } = useCart();
  const navigate = useNavigate();

  const items = products || productos;

  const [visibleCount, setVisibleCount] = useState(12);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 8, items.length));
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [items.length]);

  const handleAddToCart = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(producto);
  };

  if (!items || items.length === 0) {
    return <div className="text-center mt-5">No hay productos disponibles.</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Cargando productos...</span>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-4 p-3">
          {items.slice(0, visibleCount).map((producto) => (
            <Link
              to={`/product/${producto.id}`}
              key={producto.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                className="shadow-sm border-0 h-100 card-hover"
                style={{ width: '15rem', transition: 'transform 0.2s ease-in-out' }}
              >
                <Card.Img
                  variant="top"
                  src={producto.image || 'https://via.placeholder.com/300x300?text=Sin+imagen'}
                  className="img-fluid rounded-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title
                      className="text-truncate fw-semibold"
                      title={producto.title}
                      style={{ fontSize: '1rem' }}
                    >
                      {producto.title}
                    </Card.Title>

                    {producto.on_offer ? (
                      <>
                        <div className="text-muted text-decoration-line-through">
                          ${producto.price}
                        </div>
                        <div className="fw-bold text-danger">
                          ${producto.offer_price}
                          <Badge bg="danger" className="ms-2">Oferta</Badge>
                        </div>
                      </>
                    ) : (
                      <div className="fw-bold text-success">${producto.price}</div>
                    )}

                    <div className="d-flex align-items-center mt-2 text-muted" style={{ fontSize: '0.85rem' }}>
                      <HeartFill color="red" size={16} className="me-1" />
                      {producto.rating || 0}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-4"
                    onClick={(e) => handleAddToCart(e, producto)}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </Link>
          ))}

          {/* Intersection observer sentinel */}
          {visibleCount < items.length && (
            <div ref={sentinelRef} style={{ height: 1, width: '100%' }} />
          )}
        </div>
      )}
    </div>
  );
};

export default CardComponent;
