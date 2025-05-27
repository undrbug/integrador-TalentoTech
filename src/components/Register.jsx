import React from 'react';

const Register = () => {
  return (
    <div>
        <h1>Registro</h1>
        <form className="m-4 p-4">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" required />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input type="password" className="form-control" id="confirmPassword" required />
            </div>
            <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
    </div>
  );
}

export default Register;
    