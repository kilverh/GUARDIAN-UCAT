import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia a useNavigate
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/IncidentHistory.css'; // Importa el archivo de estilos

const IncidentHistory = () => {
    const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/reports', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de incluir el token
                    }
                });
                const data = await response.json();
                setIncidents(data);
            } catch (error) {
                console.error('Error fetching incidents:', error);
            }
        };

        fetchIncidents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/reports/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Incluir el token
                }
            });
            if (response.ok) {
                // Actualiza la lista de incidentes después de eliminar uno
                setIncidents(incidents.filter((incident) => incident.id !== id));
                alert('Incidente eliminado exitosamente.');
            } else {
                alert('Error al eliminar el incidente.');
            }
        } catch (error) {
            console.error('Error deleting incident:', error);
            alert('Error al eliminar el incidente.');
        }
    };

    return (
        <div className="incident-history-container">
            <h2 className="title">Historial de Incidentes</h2>
            <div className="incident-list">
                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <div className="incident-item" key={incident.id}>
                            <h3 className="incident-description">{incident.description}</h3>
                            <p className="incident-category">Categoría: {incident.category}</p>
                            <p className="incident-location">Ubicación: {incident.location}</p>
                            {incident.evidence_link && (
                                <a href={incident.evidence_link} target="_blank" rel="noopener noreferrer" className="evidence-link">
                                    Ver Evidencia
                                </a>
                            )}
                            <button className="delete-button" onClick={() => handleDelete(incident.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay incidentes reportados.</p>
                )}
            </div>
            <button className="back-button" onClick={() => navigate('/menu')}>
                Volver al Menú Principal
            </button>
        </div>
    );
};

export default IncidentHistory;
