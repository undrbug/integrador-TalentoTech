import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CardComponent = ({onAddToCart}) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [text, setText] = useState(buttonText);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Lo tengo que llevar al archivo env
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProductos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }
    , []);

    return (
        <div className="d-flex flex-column min-vh-100">
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className=" d-flex flex-wrap justify-content-center gap-3 m-3">

                    {productos.map((producto) => (
                        <div key={producto.id}>
                            <Card style={{ width: '12rem' }}>
                                <Card.Img className='card-img' variant="top" src={producto.image} />
                                <Card.Body>
                                    <Card.Title className='card-title'>{producto.title}</Card.Title>
                                    <Card.Text>{"usd " + producto.price}</Card.Text>
                                </Card.Body>
                                <Button className='btn-agregar'  onClick={() => onAddToCart(producto)}>Agregar al carrito</Button>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardComponent;
