import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/Login.css'; // Asegúrate de crear este archivo

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRecover = async (e) => {
        e.preventDefault();
        try {
            // Simulación de solicitud de recuperación de contraseña
            setMessage('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
            setEmail('');
        } catch (error) {
            console.error('Error al enviar solicitud de recuperación:', error);
            setMessage('Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <form onSubmit={handleRecover} className="auth-form">
                    <h2>Recuperar Contraseña</h2>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button">Enviar</button>
                    {message && <p className="message">{message}</p>}
                    <p className="register-redirect">
                        ¿No te has registrado?{' '}
                        <span onClick={handleRegisterRedirect} className="register-link">
                            Regístrate
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;
