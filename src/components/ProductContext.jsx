import { createContext, useContext, useState, useEffect } from 'react';

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al cargar productos', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider value={{ productos, setProductos, loading }}>
            {children}
        </ProductosContext.Provider>
    );
};