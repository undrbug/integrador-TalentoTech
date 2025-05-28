import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const onAddToCart = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  return (
    <CartContext.Provider value={{ carrito, onAddToCart, setCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
