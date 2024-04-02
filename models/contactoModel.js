// models/Contacto.js

const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  telefono: String,
  mensaje: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const contactoModel = mongoose.model('Contacto', contactoSchema);

module.exports = contactoModel;
