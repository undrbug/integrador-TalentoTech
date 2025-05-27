import { useState } from 'react';
import CardComponent from './CardComponent.jsx';
import Cart from './Cart.jsx';
import MiniCart from './MiniCart.jsx';

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleAddToCart = (producto) => {
        setCartItems(prev => [...prev, producto]);
    };

    const toggleCart = () => {
        setIsCartVisible(prev => !prev);
    };

    return (
        <>
        <div className='mini-cart'>
             <MiniCart count={cartItems.length} toggleCart={toggleCart} />
        </div>
            {isCartVisible && cartItems.length > 0 && (
                <Cart items={cartItems} setItems={setCartItems} />
            )}
            <CardComponent onAddToCart={handleAddToCart} />
        </>
    );
};

export default Shop;
