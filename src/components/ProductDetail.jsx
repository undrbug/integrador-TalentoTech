import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Card, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { useProductos } from './ProductContext';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const { productos, loading } = useProductos();
    const [producto, setProducto] = useState(null);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const { onAddToCart } = useCart();

    useEffect(() => {
        if (!loading) {
            const found = productos.find((prod) => prod.id === parseInt(id));
            setProducto(found || null);
        }
    }, [loading, productos, id]);

    const handleClose = () => {
        setShow(false);
        navigate('/');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Cargando producto...</span>
            </div>
        );
    }

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="text-primary">
                    {producto ? producto.title : 'Producto no encontrado'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {producto ? (
                    <Row>
                        <Col md={5}>
                            <img
                                src={producto.image || 'https://via.placeholder.com/400x400?text=Sin+imagen'}
                                alt={producto.title}
                                className="img-fluid rounded shadow-sm"
                            />
                        </Col>
                        <Col md={7}>
                            <h5 className="mb-3">{producto.category && <Badge bg="secondary" className="me-2">{producto.category}</Badge>}</h5>
                            <p className="text-muted">{producto.description}</p>

                            <div className="mb-3">
                                {producto.on_offer ? (
                                    <>
                                        <div className="text-muted text-decoration-line-through">Precio: ${producto.price}</div>
                                        <h4 className="text-danger fw-bold">Oferta: ${producto.offer_price}</h4>
                                    </>
                                ) : (
                                    <h4 className="fw-bold text-success">Precio: ${producto.price}</h4>
                                )}
                            </div>

                            <div className="mb-3">
                                Stock: {producto.stock > 0
                                    ? <span className={producto.stock < 5 ? 'text-warning' : 'text-success'}>{producto.stock} unidades</span>
                                    : <span className="text-danger">Sin stock</span>
                                }
                            </div>

                            {producto.rating > 0 && (
                                <div className="mb-3">
                                    <small className="text-muted">⭐ {producto.rating} ({producto.rating_count} valoraciones)</small>
                                </div>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <div className="text-center">
                        <p>El producto no fue encontrado.</p>
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    Volver a la tienda
                </Button>

                {producto && producto.stock > 0 && (
                    <Button
                        variant="primary"
                        onClick={() => {
                            onAddToCart(producto);
                            toast.success('Producto agregado al carrito');
                            handleClose();
                        }}
                    >
                        Agregar al carrito
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetail;
