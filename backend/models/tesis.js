const mongoose = require('mongoose');

const tesisSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  tutor: String,
  carrera: String,
  facultad: String,
  año: Number,
  palabrasClave: [String],
  descripcion: String,
  archivoUrl: String // URL o path al archivo en la nube
});

module.exports = mongoose.model('Tesis', tesisSchema);
