const express = require('express');
const router = express.Router();
const upload = require('../config/storage');
const adminCtrl = require('../controllers/adminCtrl');

// Ruta POST para agregar un nuevo producto
router.post('/', upload.single('productImage'), adminCtrl.addProduct);

// Ruta GET para obtener todos los productos
router.get('/', adminCtrl.getAllProductos);

// Ruta GET para obtener la imagen de un producto por su ID
router.get('/image/:id', adminCtrl.getProductImageById);

router.delete('/:id', adminCtrl.deleteProduct);


module.exports = router;
