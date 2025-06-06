// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware para habilitar CORS y poder manejar JSON
app.use(cors());
app.use(express.json()); // Middleware para leer JSON de las peticiones

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Ruta para servir el index.html (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Ruta para servir el register.html (crear cuenta)
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'register.html'));
});

// Ruta explícita para admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'admin.html'));
});

// Usar las rutas de autenticación para manejar POST en /register
app.use('/api/auth', authRoutes);  // Nota: Es '/api/auth/register' para el POST de registro

// Configuración del puerto y escucha del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const tesisRoutes = require('./routes/tesisRoutes');
app.use('/api/tesis', tesisRoutes);





module.exports = app;
