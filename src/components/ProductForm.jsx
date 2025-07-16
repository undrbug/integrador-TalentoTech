import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ initialProduct, onSubmit, loading, apiErrors }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: '',
    on_offer: false,
    offer_price: '',
    ...initialProduct
  });

  const [errors, setErrors] = useState({});

  // Validmaos los campos del formulario
  const validate = () => {
    const newErrors = {};
    if (!product.title.trim()) newErrors.title = 'El título es obligatorio';
    else if (product.title.length < 10 || product.title.length > 50)
      newErrors.title = 'El título debe tener entre 10 y 50 caracteres';

    if (!product.price) newErrors.price = 'El precio es obligatorio';
    else if (isNaN(product.price) || Number(product.price) < 0)
      newErrors.price = 'El precio debe ser un número positivo';

    if (!product.description.trim())
      newErrors.description = 'La descripción es obligatoria';
    else if (product.description.length < 10 || product.description.length > 200)
      newErrors.description = 'La descripción debe tener entre 10 y 200 caracteres';

    if (!product.category.trim())
      newErrors.category = 'La categoría es obligatoria';

    if (!product.stock && product.stock !== 0)
      newErrors.stock = 'El stock es obligatorio';
    else if (isNaN(product.stock) || Number(product.stock) < 0)
      newErrors.stock = 'El stock debe ser un número positivo';

    if (product.on_offer) {
      if (!product.offer_price && product.offer_price !== 0)
        newErrors.offer_price = 'El precio de oferta es obligatorio si está en oferta';
      else if (isNaN(product.offer_price) || Number(product.offer_price) < 0)
        newErrors.offer_price = 'El precio de oferta debe ser un número positivo';
      else if (Number(product.offer_price) >= Number(product.price))
        newErrors.offer_price = 'El precio de oferta debe ser menor al precio normal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // mostramos errores del backend (apiErrors)
  useEffect(() => {
    if (apiErrors) {
      const formattedErrors = {};
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach(e => {
          if (e.param) formattedErrors[e.param] = e.msg;
        });
      }
      setErrors(formattedErrors);
    }
  }, [apiErrors]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit(product);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="price" className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          min="0"
          name="price"
          value={product.price}
          onChange={handleChange}
          isInvalid={!!errors.price}
        />
        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={product.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="image" className="mb-3">
        <Form.Label>URL de la imagen</Form.Label>
        <Form.Control
          type="url"
          name="image"
          value={product.image}
          onChange={handleChange}
          isInvalid={!!errors.image}
        />
        <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="category" className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          isInvalid={!!errors.category}
        />
        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="stock" className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          min="0"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          isInvalid={!!errors.stock}
        />
        <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="on_offer" className="mb-3">
        <Form.Check
          type="checkbox"
          label="¿En oferta?"
          name="on_offer"
          checked={product.on_offer}
          onChange={handleChange}
        />
      </Form.Group>

      {product.on_offer && (
        <Form.Group controlId="offer_price" className="mb-3">
          <Form.Label>Precio de oferta</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="0"
            name="offer_price"
            value={product.offer_price}
            onChange={handleChange}
            isInvalid={!!errors.offer_price}
          />
          <Form.Control.Feedback type="invalid">{errors.offer_price}</Form.Control.Feedback>
        </Form.Group>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </Button>
    </Form>
  );
};

export default ProductForm;
