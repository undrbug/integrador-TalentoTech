import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const success = register(email, password);
    if (success) {
      navigate('/login');
    } else {
      setError('El usuario ya existe');
    }
  };

  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center min-vh-60">
      <h1>Registro</h1>
      <form className="m-4 p-4" onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmPassword" required />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </Container>
  );
};

export default Register;