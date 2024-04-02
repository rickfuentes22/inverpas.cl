const contactoModel = require('../models/contactoModel');

exports.guardarContacto = async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;

  try {
    const nuevoContacto = new contactoModel({
      nombre,
      correo,
      telefono,
      mensaje
    });

    await nuevoContacto.save();
    res.status(201).json({ mensaje: '¡Gracias! Tu mensaje ha sido recibido.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error al procesar tu solicitud.' });
  }
};

exports.obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await contactoModel.find(); // Obtener todos los mensajes
    res.status(200).json(mensajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error al obtener los mensajes.' });
  }
};