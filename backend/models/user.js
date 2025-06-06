const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema(
  {
    cedula: {
      type: String,
      required: true,
      unique: true, // La cédula debe ser única
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // El correo debe ser único
      lowercase: true, // Se asegura de que el email se guarde en minúsculas
    },
    password: {
      type: String,
      required: true,
    },
    sedeCarrera: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agrega las fechas de creación y actualización automáticamente
  }
);

// Método para comparar las contraseñas (para login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Método para generar el token JWT
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware para cifrar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Si la contraseña no fue modificada, no hace nada
  }

  // Cifrar la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
