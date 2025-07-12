import { createContext, useContext, useState, useEffect } from 'react';

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products');
                const data = await res.json();
                setProductos(data);
                setError(null);
            } catch (error) {
                setError('Error al cargar productos');
                console.error('Error al cargar productos', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider value={{ productos, setProductos, loading, error }}>
            {children}
        </ProductosContext.Provider>
    );
};