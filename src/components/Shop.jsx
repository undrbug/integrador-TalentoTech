import { useState } from 'react';
import CardComponent from './CardComponent.jsx';
import Cart from './Cart.jsx';
import MiniCart from './MiniCart.jsx';
import { useCart } from './CartContext';

const Shop = () => {
    const { carrito, onAddToCart, setCarrito } = useCart();
    const [showCart, setShowCart] = useState(false);

    const handleAddToCart = (producto) => {
        setCarrito(prev => [...prev, producto]);
    };

    const toggleCart = () => {
        setShowCart(true);
    };

    return (
        <>
        <div className='mini-cart'>
             <MiniCart count={carrito.length} toggleCart={toggleCart} />
        </div>
            <Cart 
                show={showCart} 
                onHide={() => setShowCart(false)} 
            />
            <CardComponent onAddToCart={handleAddToCart} />
        </>
    );
};

export default Shop;
