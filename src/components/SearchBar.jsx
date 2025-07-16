import React, { useState, useEffect } from 'react';
import { getProducts } from '../apiService';
import CardComponent from './CardComponent';

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container py-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading && <div className="text-center">Cargando productos...</div>}
      {/* Solo muestra resultados si hay texto en la barra de búsqueda */}
      {search && !loading && (
        filteredProducts.length > 0 ? (
          <div className="container">
            <div className="text-center mb-4">
              <h2>Resultados de búsqueda</h2>
            </div>
                <CardComponent products={filteredProducts} />
            </div>
        ) : (
          <div className="text-center">No se encontraron productos.</div>
        )
      )}
    </div>
  );
};

export default SearchBar;