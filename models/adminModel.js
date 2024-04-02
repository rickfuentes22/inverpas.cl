// adminModel.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, "nombre es requerido"],
  },

  email: {
    type: String,
    required: [true, "email es requerido"],
  },
  password: {
    type: String,
    required: [true, "contraseña es requerida"],
  },
});

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;    
