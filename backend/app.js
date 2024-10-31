const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/backend/config/db.js');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/kilverthestebanclarosordonez/Downloads/GUARDIAN-UCAT/backend/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes y PDFs'));
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, 'tu_clave_secreta', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Endpoint para el registro
app.post('/api/register', async (req, res) => {
    const { name, role, email, password } = req.body;

    if (!name || !role || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query(
            'INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4)',
            [name, role, email, hashedPassword]
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Endpoint para el login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                const token = jwt.sign({ user_id: user.id }, '290701', { expiresIn: '1h' });
                res.status(200).json({ message: 'Login exitoso', token });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

// Endpoint para reportar un incidente
app.post('/api/report', authenticateToken, upload.single('evidence'), async (req, res) => {
    const { description, location, category_id } = req.body;
    const evidence_link = req.file ? req.file.path : null;

    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!description || !location) {
        return res.status(400).json({ message: 'Descripción y ubicación son requeridas' });
    }

    try {
        await pool.query(
            'INSERT INTO incidents (user_id, category_id, description, location, evidence_link) VALUES ($1, $2, $3, $4, $5)',
            [req.user.user_id, category_id, description, location, evidence_link]
        );
        res.status(201).json({ message: 'Incidente reportado exitosamente' });
    } catch (error) {
        console.error('Error al reportar incidente:', error);
        res.status(500).json({ message: 'Error al reportar incidente', error: error.message });
    }
});

// Endpoint para obtener todos los incidentes
app.get('/api/reports', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM incidents WHERE user_id = $1', [req.user.user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los incidentes:', error);
        res.status(500).json({ message: 'Error al obtener los incidentes' });
    }
});

// Endpoint para eliminar un incidente
app.delete('/api/reports/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM incidents WHERE id = $1 AND user_id = $2', [id, req.user.user_id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        
        res.status(200).json({ message: 'Incidente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar incidente:', error);
        res.status(500).json({ message: 'Error al eliminar incidente' });
    }
});

// Iniciar el servidor
app.listen(5001, () => {
    console.log('Servidor escuchando en el puerto 5001');
});
