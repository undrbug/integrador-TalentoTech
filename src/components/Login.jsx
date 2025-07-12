import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Error al iniciar sesión. Intente de nuevo.';
      setError(errorMessage);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h1>Iniciar Sesión</h1>
      <Form className="m-4 p-4 border rounded shadow-sm" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            placeholder="nombre@ejemplo.com"
            required 
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password"
            placeholder="Contraseña"
            required 
          />
        </Form.Group>
        
        <div className="d-grid">
            <Button variant="primary" type="submit">
                Iniciar Sesión
            </Button>
        </div>
      </Form>
      <p>¿No tenés una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </Container>
  );
};

export default Login;