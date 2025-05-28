import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useProductos } from './ProductContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { productos, loading } = useProductos();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const foundProducto = productos.find((prod) => prod.id === parseInt(id));
            setProducto(foundProducto);

            if (!foundProducto) {
                setTimeout(() => {
                    navigate('/shop', { replace: true });
                }, 2000);
            }
        }
    }, [loading, productos, id, navigate]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!producto) {
        return (
            <div>
                <h3>Producto no encontrado</h3>
                <p>Redirigiendo a la tienda...</p>
                <p>Si no es redirigido, haga click <a href="/shop">aquí</a>.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{producto.title}</h1>
            <Card style={{ width: '20rem', margin: 'auto', marginTop: '2rem' }}>
                <Card.Img className='card-img' variant="top"  src={producto.image} />
                <Card.Body>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>{producto.description}</Card.Text>
                    <Card.Text>{"USD " + producto.price}</Card.Text>
                    <div className="d-grid gap-2">
                    <Button variant="primary">Agregar al carrito</Button>
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
