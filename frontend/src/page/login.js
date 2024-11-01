import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/Login.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                onLogin();
                navigate('/'); // Redirige al menú principal después de iniciar sesión
            } else {
                const errorMessage = await response.text();
                setError(errorMessage); // Muestra el error devuelto por el servidor
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setError('Error al iniciar sesión. Por favor intenta nuevamente.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Ingresar</button>
                <p className="recover-password-redirect">
                    ¿Olvidaste tu contraseña?{' '}
                    <Link to="/recover-password" className="recover-link">Recuperar contraseña</Link>
                </p>
                <p className="recover-password-redirect">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="recover-link">Regístrate aquí</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
