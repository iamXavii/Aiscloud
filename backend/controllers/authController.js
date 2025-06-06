// backend/controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const user = new User({ email, password });
    await user.save();

    // Generar un token
    const token = user.generateToken();

    res.status(201).json({ message: 'Usuario creado con éxito', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Función para iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token
    const token = user.generateToken();

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
