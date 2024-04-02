const express = require('express');
const router = express.Router();
const contactoCtrl = require('../controllers/contactoCtrl');

router.post('/guardar', contactoCtrl.guardarContacto);
router.get('/mensajes', contactoCtrl.obtenerMensajes);

module.exports = router;
