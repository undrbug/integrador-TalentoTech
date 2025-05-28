import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useProductos } from './ProductContext';

const CardComponent = ({ onAddToCart }) => {
    const { productos, loading } = useProductos();
    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/product/${id}`);
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (productos.length === 0) {
        return <div>No hay productos disponibles.</div>;
    }


    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    <div className=" d-flex flex-wrap justify-content-center gap-3 m-3">

                        {productos.map((producto) => (
                            <div key={producto.id}>

                                <Link to={`/product/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card style={{ width: '12rem' }}>
                                        <Card.Img className='card-img' variant="top" src={producto.image} />
                                        <Card.Body>
                                            <Card.Title className='card-title'>{producto.title}</Card.Title>
                                            <Card.Text>{"usd " + producto.price}</Card.Text>
                                        </Card.Body>
                                        <Button
                                            className='btn-agregar'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onAddToCart(producto);
                                            }}
                                        >
                                            Agregar al carrito
                                        </Button>
                                    </Card>
                                </Link >
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default CardComponent;
