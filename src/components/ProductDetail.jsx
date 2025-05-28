import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useProductos } from './ProductContext';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const { productos, loading } = useProductos();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate();
    const { onAddToCart } = useCart();

    useEffect(() => {
        if (!loading) {
            const foundProducto = productos.find((prod) => prod.id === parseInt(id));
            setProducto(foundProducto);

            if (!foundProducto) {
                <>
                <p>Producto no encontrado...</p>
                <Link to="/shop">Volver a la tienda</Link>
                </>

            }
        }
    }, [loading, productos, id, navigate]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!producto) {
        return (
            <div>
                <p>Producto no encontrado...</p>
                <Link to="/shop">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{producto.title}</h1>
            <Card style={{ width: '20rem', margin: 'auto', marginTop: '2rem' }}>
                <Card.Img className='card-img' variant="top" src={producto.image} />
                <Card.Body>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Card.Text>{"USD " + producto.price}</Card.Text>
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={() => onAddToCart(producto)}>Agregar al carrito</Button>
                        <Button variant="secondary" onClick={() => navigate('/shop')} >
                            Volver a la tienda
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductDetail;
