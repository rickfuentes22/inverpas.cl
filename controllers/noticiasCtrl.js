const noticiasModel = require("../models/noticiasModel");

// Controlador para obtener todas las noticias
exports.getNoticias = async (req, res) => {
  try {
    const noticias = await noticiasModel.find();
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener una noticia por ID
exports.getNoticiaById = async (req, res) => {
  try {
    const noticia = await noticiasModel.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear una nueva noticia
exports.createNoticia = async (req, res) => {
  try {
    let imagenNoticia = ''; // Inicializar imagenNoticia como una cadena vacía
    if (req.file) {
      imagenNoticia = req.file.filename; // Asignar el nombre de archivo si se proporciona un archivo
    }

    const { title, content } = req.body;

    // Crear una nueva noticia con la imagenNoticia si existe
    const newNoticia = await noticiasModel.create({ title, content, imagenNoticia });
    
    res.status(201).json(newNoticia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNoticia = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagenNoticia = req.file ? req.file.filename : null; // Cambio de 'imagen' a 'imagenNoticia'

    const updatedNoticia = await noticiasModel.findByIdAndUpdate(
      req.params.id,
      { title, content, imagenNoticia }, // Cambio de 'imagen' a 'imagenNoticia'
      { new: true }
    );

    if (!updatedNoticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    res.json(updatedNoticia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para eliminar una noticia
exports.deleteNoticia = async (req, res) => {
  try {
    const deletedNoticia = await noticiasModel.findByIdAndDelete(req.params.id);
    if (!deletedNoticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json({ message: "Noticia eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
