import { createContext, useContext, useState, useEffect } from 'react';
import api from '../apiService';

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargamos los productos
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProductos(res.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos', err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // creamos un producto
  const addProduct = async (product) => {
    try {
      const res = await api.post('/products', product);
      setProductos(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      console.error('Error al agregar producto:', err);
      return { success: false, error: err.response?.data?.errors || 'Error del servidor' };
    }
  };

  // Editamos un producto
  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await api.put(`/products/${id}`, updatedProduct);
      setProductos(prev =>
        prev.map(p => (p.id === id ? res.data : p))
      );
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      return { success: false, error: err.response?.data?.errors || 'Error del servidor' };
    }
  };

  // Borramos un producto
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProductos(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error al borrar producto:', err);
      return { success: false, error: 'Error al borrar producto' };
    }
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      loading,
      error,
      fetchProductos,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductosContext.Provider>
  );
};
