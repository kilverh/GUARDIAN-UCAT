import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/frontend/src/styles/InidentReportForm.css'; // Asegúrate de que la ruta sea correcta

const IncidentReportForm = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 4.6097, lng: -74.0817 });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos requeridos
        if (!description || !categoryId || !coordinates.lat || !coordinates.lng) {
            setMessage('Descripción y ubicación son requeridas');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('location', JSON.stringify(coordinates)); // Enviar coordenadas como JSON
        formData.append('category_id', categoryId);
        if (evidence) formData.append('evidence', evidence);

        try {
            const token = localStorage.getItem('token'); // Obtener el token
            console.log('Token:', token); // Verifica el token

            const response = await axios.post('http://localhost:5001/api/report', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Incluir el token aquí
                }
            });
            setMessage('Incidente reportado exitosamente');
            console.log('Incidente reportado:', response.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Error al reportar el incidente');
        }
    };

    useEffect(() => {
        const initMap = L.map('map').setView([coordinates.lat, coordinates.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(initMap);

        let marker = L.marker([coordinates.lat, coordinates.lng]).addTo(initMap); // Añadido el marcador inicial
        
        initMap.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setCoordinates({ lat, lng });
            marker.setLatLng(e.latlng); // Actualiza la posición del marcador
        });

        return () => initMap.remove();
    }, [coordinates.lat, coordinates.lng]);

    // Función para redirigir al menú principal
    const handleNavigateHome = () => {
        navigate('/home'); // Cambia '/home' a la ruta de tu menú principal
    };

    return (
        <div className="incident-report-container">
            <div className="incident-report-form">
                <h2>Reporte de Incidente</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Descripción del Incidente:</label>
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Categoría:</label>
                        <select 
                            value={categoryId} 
                            onChange={(e) => setCategoryId(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="1">Robo</option>
                            <option value="2">Acoso</option>
                            <option value="3">Violencia</option>
                            <option value="4">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Evidencia (opcional):</label>
                        <input
                            type="file"
                            onChange={(e) => setEvidence(e.target.files[0])}
                        />
                    </div>

                    <div className="form-group">
                        <label>Selecciona la ubicación en el mapa:</label>
                        <div id="map" style={{ height: '300px', width: '100%', marginBottom: '10px', border: '2px solid #00376b', borderRadius: '5px' }}></div>
                        <p>Coordenadas seleccionadas: Latitud {coordinates.lat}, Longitud {coordinates.lng}</p>
                    </div>

                    <button type="submit">Reportar Incidente</button>
                </form>

                {/* Botón para redirigir al menú principal */}
                <button className="back-button" onClick={handleNavigateHome}>
                    Volver al Menú Principal
                </button>
            </div>
        </div>
    );
};

export default IncidentReportForm;
