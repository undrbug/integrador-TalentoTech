import { useEffect, useState } from 'react';
import { getProductDeals } from '../apiService';
import CardComponent from './CardComponent';
import MiniCart from './MiniCart';
import Cart from './Cart';
import SearchBar from "./SearchBar.jsx";
import { useCart } from './CartContext';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const { carrito } = useCart();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await getProductDeals();
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };
    fetchDeals();
  }, []);

  const toggleCart = () => setShowCart(true);

  return (
    <div className="container mt-5">
      <SearchBar />
      <div className='mini-cart'>
        <MiniCart count={carrito.length} toggleCart={toggleCart} />
      </div>
      <Cart show={showCart} onHide={() => setShowCart(false)} />

      <h2>Ofertas Especiales</h2>
      {deals.length > 0 ? (
        <CardComponent products={deals} />
      ) : (
        <p>No hay ofertas especiales disponibles.</p>
      )}
      <hr />
      <h3>Síguenos en nuestras redes sociales</h3>
      <p>¡No te pierdas nuestras promociones y novedades!</p>
    </div>
  );
}

export default Deals;
