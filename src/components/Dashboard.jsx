import { useState, useEffect } from 'react';
import { Nav, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useProductos } from './ProductContext';
import { PencilSquare, Trash } from 'react-bootstrap-icons';


const Dashboard = () => {
  const { productos, loading, error, addProduct, updateProduct, deleteProduct } = useProductos();

  const [activeTab, setActiveTab] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Modal handlers
  const openModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Crear producto
  const handleCreate = async (productData) => {
    setModalLoading(true);
    const result = await addProduct(productData);
    setModalLoading(false);

    if (result.success) {
      toast.success('Producto creado exitosamente');
      closeModal();
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach(e => toast.error(e.msg || e));
      } else {
        toast.error(result.error || 'Error al crear producto');
      }
    }
  };

  // Editar producto
  const handleEdit = async (productData) => {
    setModalLoading(true);
    const result = await updateProduct(selectedProduct.id, productData);
    setModalLoading(false);

    if (result.success) {
      toast.success('Producto actualizado exitosamente');
      closeModal();
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach(e => toast.error(e.msg || e));
      } else {
        toast.error(result.error || 'Error al actualizar producto');
      }
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    setModalLoading(true);
    const result = await deleteProduct(id);
    setModalLoading(false);

    if (result.success) {
      toast.success('Producto eliminado exitosamente');
      closeModal();
    } else {
      toast.error(result.error || 'Error al eliminar producto');
    }
  };

  // Formulario para crear/editar productos
  const ProductForm = ({ initialData = {}, onSubmit }) => {
    const [form, setForm] = useState({
      title: initialData.title || '',
      description: initialData.description || '',
      price: initialData.price || '',
      image: initialData.image || '',
      category: initialData.category || '',
      stock: initialData.stock || 0,
      on_offer: initialData.on_offer || false,
      offer_price: initialData.offer_price || '',
      rating: initialData.rating || 0,
      rating_count: initialData.rating_count || 0
    });

    const handleChange = e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm({ ...form, [e.target.name]: value });
    };

    const submit = e => {
      e.preventDefault();
      // Validaciones mínimas
      if (!form.title || !form.price) {
        toast.error("Título y precio son obligatorios");
        return;
      }
      if (form.on_offer && (!form.offer_price || form.offer_price <= 0)) {
        toast.error("Si el producto está en oferta, debe indicar un precio de oferta válido");
        return;
      }
      onSubmit({
        ...initialData,
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        offer_price: form.on_offer ? parseFloat(form.offer_price) : null,
        rating: parseFloat(form.rating) || 0,
        rating_count: parseInt(form.rating_count, 10) || 0
      });
    };

    return (
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Descripción</Form.Label>
          <Form.Control name="description" as="textarea" value={form.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Precio</Form.Label>
          <Form.Control name="price" type="number" value={form.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control name="image" value={form.image} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Categoría</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Stock</Form.Label>
          <Form.Control name="stock" type="number" value={form.stock} onChange={handleChange} />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="¿Está en oferta?"
          name="on_offer"
          checked={form.on_offer}
          onChange={handleChange}
        />
        {form.on_offer && (
          <Form.Group className="mb-2">
            <Form.Label>Precio de Oferta</Form.Label>
            <Form.Control name="offer_price" type="number" value={form.offer_price} onChange={handleChange} />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label>Rating</Form.Label>
          <Form.Control name="rating" type="number" value={form.rating} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Rating Count</Form.Label>
          <Form.Control name="rating_count" type="number" value={form.rating_count} onChange={handleChange} />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={closeModal} disabled={modalLoading}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={modalLoading}>
            {modalType === 'edit' ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </Form>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <Nav className="flex-column text-light p-4" style={{ minWidth: 220, height: '100vh' }} variant="pills" activeKey={activeTab} onSelect={setActiveTab}>
        <div className="mb-4 text-center">
          <h4>BienHelada</h4>
          <div className="text-muted small">Panel de Administración</div>
        </div>
        <Nav.Item>
          <Nav.Link eventKey="products" className="text-light">Productos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="users" className="text-light" disabled>Usuarios (en desarrollo)</Nav.Link>
        </Nav.Item>
      </Nav>
      <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh', overflowY: 'auto' }}>
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <h2 className="fw-bold mb-4 text-primary" style={{ fontSize: "1.7rem" }}>
            Panel de Control - {activeTab === 'users' ? 'Usuarios' : 'Productos'}
          </h2>
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando datos...</p>
            </div>
          )}
          {!loading && activeTab === 'products' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Gestión de Productos</h5>
                <Button variant="success" onClick={() => openModal('add')}>Agregar Producto</Button>
              </div>
              <Table striped bordered hover responsive className="bg-white">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td className="text-center" style={{ width: '80px' }}>
                        {product.image ? (
                          <img src={product.image} alt={product.title} style={{ maxHeight: '40px', maxWidth: '40px' }} />
                        ) : (
                          <span className="text-muted small">Sin imagen</span>
                        )}
                      </td>
                      <td>
                        {product.title}
                        {product.on_offer && (
                          <Badge bg="danger" className="ms-2">Oferta</Badge>
                        )}
                      </td>
                      <td>{product.category || 'Sin categoría'}</td>
                      <td>
                        {product.on_offer ? (
                          <>
                            <span className="text-decoration-line-through text-muted me-2">
                              ${product.price}
                            </span>
                            <span className="fw-bold text-danger">
                              ${product.offer_price}
                            </span>
                          </>
                        ) : (
                          <>${product.price}</>
                        )}
                      </td>
                      <td>
                        {product.stock > 0 ? (
                          <span className={product.stock < 10 ? 'text-warning' : ''}>{product.stock}</span>
                        ) : (
                          <span className="text-danger">Sin stock</span>
                        )}
                      </td>
                      <td className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 rounded-circle p-2"
                          onClick={() => openModal('edit', product)}
                          title="Editar"
                        >
                          <PencilSquare size={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2 rounded-circle p-2"
                          onClick={() => openModal('delete', product)}
                          title="Eliminar"
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {/* Modal */}
          <Modal show={showModal} onHide={closeModal} size="lg" backdrop="static" keyboard={!modalLoading}>
            <Modal.Header closeButton={!modalLoading}>
              <Modal.Title>
                {modalType === 'add' && 'Agregar Producto'}
                {modalType === 'edit' && 'Editar Producto'}
                {modalType === 'delete' && 'Eliminar Producto'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === 'add' && (
                <ProductForm onSubmit={handleCreate} />
              )}
              {modalType === 'edit' && selectedProduct && (
                <ProductForm initialData={selectedProduct} onSubmit={handleEdit} />
              )}
              {modalType === 'delete' && selectedProduct && (
                <div className="text-center">
                  <p>¿Seguro que deseas eliminar el producto <b>{selectedProduct.title}</b>?</p>
                  <Button variant="danger" onClick={() => handleDelete(selectedProduct.id)} disabled={modalLoading}>
                    {modalLoading ? 'Eliminando...' : 'Eliminar'}
                  </Button>
                  <Button variant="secondary" onClick={closeModal} disabled={modalLoading} className="ms-2">
                    Cancelar
                  </Button>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
