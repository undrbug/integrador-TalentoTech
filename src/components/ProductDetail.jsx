import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import { useProductos } from './ProductContext';
import { useCart } from './CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { productos, loading } = useProductos();
    const [producto, setProducto] = useState(null);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const { onAddToCart } = useCart();

    useEffect(() => {
        if (!loading) {
            const foundProducto = productos.find((prod) => prod.id === parseInt(id));
            setProducto(foundProducto);
        }
    }, [loading, productos, id]);

    const handleClose = () => {
        setShow(false);
        navigate('/shop');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {producto ? producto.title : 'Producto no encontrado'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {producto ? (
                    <Card style={{ border: 'none' }}>
                        <Card.Img className='card-img' variant="top" src={producto.image} />
                        <Card.Body>
                            <Card.Text>{producto.description}</Card.Text>
                            <Card.Text><strong>USD {producto.price}</strong></Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <div>
                        <p>Producto no encontrado...</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {producto && (
                    <Button variant="primary" onClick={() => {
                        onAddToCart(producto);
                        handleClose();
                    }}>
                        Agregar al carrito
                    </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Volver a la tienda
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetail;
