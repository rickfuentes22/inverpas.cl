const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String, // Cambiar el tipo a String si el campo es la ruta de la imagen
    required: false, // Cambiar a false si no se requiere que todos los productos tengan imágenes asociadas
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productosModel = mongoose.model('Product', productSchema);

module.exports = productosModel;
