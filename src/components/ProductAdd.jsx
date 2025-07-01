import { useState } from 'react';
import { useProductos } from './ProductContext.jsx';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const ProductAdd = () => {

    const { productos, setProductos } = useProductos();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleRedirect = (ruta) => {
        navigate(ruta);
    };
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        description: ''
    });

    const validForm = () => {
        const newErrors = {};
        if (!newProduct.title.trim()) {
            newErrors.title = 'El título es obligatorio';
        }
        if (!newProduct.price) {
            newErrors.price = 'El precio es obligatorio';
        } else if (isNaN(newProduct.price)) {
            newErrors.price = 'El precio debe ser un número';
        }
        if (!newProduct.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    }

    const addProduct = (product) => {
        const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, ...product };
        setProductos([...productos, newProduct]);
        console.log('Producto agregado:', newProduct);
        // setNewProduct({
        //     title: '',
        //     price: '',
        //     description: ''
        // });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validForm()) {
            addProduct(newProduct);
        }
    };

    return (
        <Container className="container d-flex flex-column align-items-center justify-content-center">
            <h2>Agregar Producto</h2>
            <Form onSubmit={handleSubmit} className="">
                <Form.Group controlId="formTitle" className="mt-3 mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        minLength={10}
                        maxLength={50}
                        required
                        autoFocus
                        placeholder="Título"
                        value={newProduct.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.title && <p className="error">{errors.title}</p>}
                <Form.Group controlId="formPrice" className="mb-3">
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Precio"
                        min="0"
                        step="0.50"
                        required
                        value={newProduct.price}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.price && <p className="error">{errors.price}</p>}
                <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Descripción"
                        minLength={10}
                        maxLength={200}
                        required
                        rows="4"
                        value={newProduct.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.description && <p className="error">{errors.description}</p>}
                <div className="d-flex justify-content-center m-3 ">
                    <Button type="submit">Agregar Producto</Button>
                </div>
            </Form>
        </Container>
    );
}

export default ProductAdd;
