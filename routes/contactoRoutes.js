const express = require('express');
const router = express.Router();
const contactoCtrl = require('../controllers/contactoCtrl');

// Ruta para guardar un nuevo mensaje
router.post('/guardar', contactoCtrl.guardarContacto);

// Ruta para obtener todos los mensajes
router.get('/mensajes', contactoCtrl.obtenerMensajes);

// Ruta para obtener un mensaje por su ID
router.get('/mensajes/:id', contactoCtrl.obtenerMensajePorId);

module.exports = router;
