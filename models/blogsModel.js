const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // Agrega más campos según sea necesario
    imagenBlog: { type: String } // Campo para almacenar el ID de la imagen
}, { collection: 'blogs' }); // Especifica el nombre de la colección aquí

const blogsModel = mongoose.model('Blog', blogSchema);
module.exports = blogsModel;
