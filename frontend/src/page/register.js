import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/api.js';
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        
        const userData = { email, password, name, role };

        try {
            const response = await registerUser(userData);
            if (response.status === 201) {
                alert('Usuario registrado exitosamente');
                navigate('/login');
            } else {
                alert('Error al registrar usuario: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error al registrar usuario. Por favor intenta nuevamente.');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Regístrate</h2>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Rol:</label>
                    <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo:</label>
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
                <button type="submit" className="register-button">Registrarse</button>
                {/* Enlaces para recuperar contraseña y volver al login */}
                <p className="recover-password-redirect">
                    ¿Olvidaste tu contraseña?{' '}
                    <Link to="/recover-password" className="recover-link">Recuperar contraseña</Link>
                </p>
                <p className="recover-password-redirect">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="recover-link">Volver al login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
