import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/PrincipalPageStyle.css';

const PrincipalPage = () => {
    const navigate = useNavigate();

    const handleReportClick = () => {
        navigate('/reports');
    };

    const handleHistoryClick = () => {
        navigate('/report-history'); // Ruta para el historial
    };

    const handleLogoutClick = () => {
        // Agregar lógica de logout
        navigate('/login'); // Redirigir al login después de cerrar sesión
    };

    return (
        <div className="principal-page">
            <header className="header">
                <h1>Bienvenido a GUARDIAN-UCAT</h1>
                <h2>Mejora la seguridad en nuestra comunidad</h2>
            </header>
            <main className="content">
                <p className="info-message">
                    ¡Bienvenido a GUARDIAN-UCAT! Esta plataforma está diseñada para 
                    fortalecer la seguridad en nuestro campus universitario. Aquí podrás 
                    reportar incidentes y acceder a un historial completo de reportes. 
                    Explora nuestras funcionalidades y ayúdanos a mantener un entorno 
                    seguro para todos.
                </p>
                <div className="button-container">
                    <button className="cta-button" onClick={handleReportClick}>Reportar un Incidente</button>
                    <button className="cta-button history-button" onClick={handleHistoryClick}>Ver Historial</button>
                    <button className="cta-button logout-button" onClick={handleLogoutClick}>Salir</button>
                </div>
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Universidad Católica de Colombia</p>
            </footer>
        </div>
    );
};

export default PrincipalPage;
