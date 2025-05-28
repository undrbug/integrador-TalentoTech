import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from './CartContext';

const Cart = () => {
    const { carrito, onAddToCart, setCarrito } = useCart();

    const hasProduct = carrito.length > 0;

    const total = carrito.reduce((acc, item) => acc + item.price, 0);

    const removeFromCart = (product) => {
        setCarrito((prevItems) => prevItems.filter((item) => item.id !== product.id));
    };

    const clearCart = () => setCarrito([]);

    const handlePurchase = () => {
        alert(`Compra realizada por un total de $${total}`);
        clearCart();
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            {hasProduct ? (
                                <>
                                    <h5>Productos en el carrito:</h5>
                                    {carrito.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center">
                                            <span>{item.title} - ${item.price}</span>
                                            <Button variant="danger" onClick={() => removeFromCart(item)}>Eliminar</Button>
                                        </div>
                                    ))}
                                    <h6>Total: ${total.toFixed(2)}</h6>
                                    <Button variant="secondary" onClick={clearCart}>Vaciar Carrito</Button>{' '}
                                    <Button variant="primary" onClick={handlePurchase}>Finalizar Compra</Button>
                                </>
                            ) : (
                                <p>No hay productos en el carrito.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;