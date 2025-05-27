import React from 'react';

const Login = () => {
    return (
        <div className="container mt-5">
            <h1>Iniciar Sesión</h1>
            <form className="m-4 p-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" required />
                </div>
                <div className="mb-3 form-check ">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a href="/register">Regístrate acá</a></p>
            <p><a href="/forgot-password">¿Olvidaste tu contraseña?</a></p>
        </div>
    );
}

export default Login;
