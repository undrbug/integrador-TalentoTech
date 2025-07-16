import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Register = () => {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (password !== confirmPassword) {
      toast.error('❌ Las contraseñas no coinciden');
      return;
    }

    const result = await registerUser(name, email, password);

    if (result.success) {
      toast.success('✅ Usuario creado exitosamente');
      setTimeout(() => navigate('/login'), 1500);
    } else if (result.fieldErrors) {
      const newFieldErrors = {};
      result.fieldErrors.forEach(err => {
        if (!newFieldErrors[err.path]) newFieldErrors[err.path] = [];
        newFieldErrors[err.path].push(err.msg);
      });
      setFieldErrors(newFieldErrors);
      toast.error('❌ Corrige los errores del formulario');
    } else if (result.message) {
      toast.error(`⚠️ ${result.message}`);
    } else {
      toast.error('❌ Error inesperado al registrar usuario');
    }
  };

  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center min-vh-60">
      <h1>Registro</h1>
      <form className="m-4 p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
            required
            minLength={2}
          />
          {fieldErrors.name && fieldErrors.name.map((msg, i) => (
            <div key={i} className="text-danger">{msg}</div>
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
            required
          />
          {fieldErrors.email && fieldErrors.email.map((msg, i) => (
            <div key={i} className="text-danger">{msg}</div>
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
            required
          />
          {fieldErrors.password && fieldErrors.password.map((msg, i) => (
            <div key={i} className="text-danger">{msg}</div>
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            className="form-control"
            id="confirmPassword"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </Container>
  );
};

export default Register;