import { useProductos } from './ProductContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { Container, Alert } from 'react-bootstrap';

const ProductAdd = () => {
  const { addProduct } = useProductos();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);

  const handleAdd = async (newProduct) => {
    setSubmitting(true);
    const result = await addProduct(newProduct);
    setSubmitting(false);

    if (result.success) {
      navigate('/products');
    } else {
      setApiErrors(result.error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Agregar Producto</h2>
      {apiErrors && (
        <Alert variant="danger">
          {Array.isArray(apiErrors)
            ? apiErrors.map((err, i) => <div key={i}>{err.msg || err}</div>)
            : apiErrors}
        </Alert>
      )}
      <ProductForm
        onSubmit={handleAdd}
        loading={submitting}
        apiErrors={apiErrors}
      />
    </Container>
  );
};

export default ProductAdd;
