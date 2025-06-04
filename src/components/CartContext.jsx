import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const onAddToCart = (producto) => {
    setCarrito(prev => {
      const productExists = (id) => carrito.some((item) => item.id === id);
      
      if (productExists(producto.id)) {
        return prev.map((item, index) => 
          item.id === producto.id 
          ? 
          { ...item, quantity: item.quantity + 1 }
          :
          item
        );
      } else {
        return [...prev, { ...producto, quantity: 1 }];
      }
    });
  };


  return (
    <CartContext.Provider value={{ carrito, onAddToCart, setCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
