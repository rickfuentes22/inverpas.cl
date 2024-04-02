const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ruta donde se guardarán los archivos subidos
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generar nombres de archivo únicos usando UUID
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Configuración adicional de Multer para filtrar archivos
const upload = multer({
  storage: storage,
});


module.exports = upload;
