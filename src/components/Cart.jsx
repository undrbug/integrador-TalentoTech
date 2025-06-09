import { Container, Table, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from './CartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { carrito, onAddToCart, setCarrito } = useCart();

    const hasProduct = carrito.length > 0;

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
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrito.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>${item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => removeFromCart(item)}>
                                                            <FaTrash size={20} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <hr />
                                    <h6>Total: ${(() => {
                                        let total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                                        return total.toFixed(2);
                                    })()}
                                    </h6>
                                    <hr />
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
        </Container >
    );
};

export default Cart;