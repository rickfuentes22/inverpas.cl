const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Agrega más campos según sea necesario
  imagenNoticia: { type: String } // Campo para almacenar el ID de la imagen
}, { collection: 'noticias' }); // Especifica el nombre de la colección aquí

const noticiasModel = mongoose.model('Noticia', noticiaSchema);
module.exports = noticiasModel;
