const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para el registro
router.post('/register', async (req, res) => {
    const { cedula, name, lastName, email, password, sedeCarrera } = req.body;
    console.log('Datos recibidos:', req.body);

    // Validación básica de los datos
    if (!cedula || !name || !lastName || !email || !password || !sedeCarrera) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validación de la contraseña (por ejemplo, mínimo 6 caracteres)
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Crear el nuevo usuario
        const newUser = new User({
            cedula,
            name,
            lastName,
            email,
            password,
            sedeCarrera
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        console.log('Usuario registrado exitosamente:', { cedula, name, lastName, email, password, sedeCarrera });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });

        // Verificar existencia y contraseña
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token si quieres (opcional por ahora)
        // const token = user.generateToken();

        res.status(200).json({
            message: 'Login exitoso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
            // token
        });
    } catch (error) {
        console.error('Error al hacer login:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});



module.exports = router;
