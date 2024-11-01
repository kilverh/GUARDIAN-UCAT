import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrincipalPage from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/PrincipalPage.js';
import Login from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/login.js';
import Register from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/register.js';
import RecoverPassword from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/RecoverPassword.js';
import IncidentReportForm from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/IncidentReportForm.js'; // Importa el formulario de incidentes
import IncidentHistory from '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/page/IncidentHistory.js'; // Importa el historial de incidentes
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/PrincipalPageStyle.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<RecoverPassword />} /> {/* Nueva ruta */}

                <Route
                    path="/"
                    element={isAuthenticated ? <PrincipalPage onLogout={handleLogout} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/reports" // Ruta para reportar incidentes
                    element={isAuthenticated ? <IncidentReportForm /> : <Navigate to="/login" />}
                />
                <Route
                    path="/report-history" // Ruta para historial de incidentes
                    element={isAuthenticated ? <IncidentHistory /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
