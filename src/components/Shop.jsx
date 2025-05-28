import { useState } from 'react';
import CardComponent from './CardComponent.jsx';
import Cart from './Cart.jsx';
import MiniCart from './MiniCart.jsx';
import { useCart } from './CartContext';

const Shop = () => {
    const { carrito, onAddToCart, setCarrito } = useCart();
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleAddToCart = (producto) => {
        setCarrito(prev => [...prev, producto]);
    };

    const toggleCart = () => {
        setIsCartVisible(prev => !prev);
    };

    return (
        <>
        <div className='mini-cart'>
             <MiniCart count={carrito.length} toggleCart={toggleCart} />
        </div>
            {isCartVisible && carrito.length > 0 && (
                <Cart items={carrito} setItems={setCarrito} onAddToCart={handleAddToCart} />
            )}
            <CardComponent onAddToCart={handleAddToCart} />
        </>
    );
};

export default Shop;
