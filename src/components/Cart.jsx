import { Modal, Table, Button, Badge } from 'react-bootstrap';
import { useCart } from './CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = ({ show, onHide }) => {
    const { carrito, setCarrito } = useCart();

    const hasProduct = carrito.length > 0;

    // Calcular total
    const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const removeFromCart = (product) => {
        setCarrito((prevItems) => prevItems.filter((item) => item.id !== product.id));
    };

    const clearCart = () => setCarrito([]);

    const handlePurchase = () => {
        alert(`Compra realizada por un total de $${total.toFixed(2)}`);
        clearCart();
        onHide(); // Cerrar el modal después de la compra
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FaShoppingCart className="me-2" />
                    Carrito de Compras
                    {hasProduct && (
                        <Badge bg="primary" className="ms-2">
                            {carrito.length}
                        </Badge>
                    )}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {hasProduct ? (
                    <>
                        <Table striped bordered hover responsive size="sm">
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
                                        <td className="text-center">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeFromCart(item)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                Total: <span className="text-primary">${total.toFixed(2)}</span>
                            </h5>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <FaShoppingCart size={48} className="text-muted mb-3" />
                        <p className="text-muted">No hay productos en el carrito.</p>
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                {hasProduct ? (
                    <>
                        <Button variant="outline-secondary" onClick={clearCart}>
                            Vaciar Carrito
                        </Button>
                        <Button variant="primary" onClick={handlePurchase}>
                            Finalizar Compra
                        </Button>
                    </>
                ) : (
                    <Button variant="secondary" onClick={onHide}>
                        Cerrar
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default Cart;