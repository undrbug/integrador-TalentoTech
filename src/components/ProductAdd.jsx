import { useState } from 'react';
import { useProductos } from './ProductContext.jsx';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {

    const { productos } = useProductos();
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
        productos.push(newProduct);
        console.log('Producto agregado:', newProduct);
        setNewProduct({
            title: '',
            price: '',
            description: ''
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validForm()) {
            addProduct(newProduct);
        }
        handleRedirect('/shop');
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={newProduct.title}
                    onChange={handleChange}
                />
                {errors.title && <p className="error">{errors.title}</p>}
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleChange}
                />
                {errors.price && <p className="error">{errors.price}</p>}
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={newProduct.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="error">{errors.description}</p>}
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
}

export default ProductAdd;
