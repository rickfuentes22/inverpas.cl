const adminModel = require('../models/adminModel')
const productosModel = require('../models/productosModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const path = require('path');

  
  // login callback
  const loginController = async (req, res) => {
    try {
      const admin = await adminModel.findOne({ email: req.body.email });
  
      if (!admin) {
        return res
          .status(200)
          .send({ message: "Usuario no encontrado", success: false });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, admin.password);
  
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "Correo o contraseña invalidos", success: false });
      }
  
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res
        .status(200)
        .send({ message: "Inicio de sesion exitoso", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error en login ${error.message}` });
    }
  };
  
  const authController = async (req, res) => {
    try {
      const admin = await adminModel.findById(req.body.adminId);
      if (!admin) {
        return res.status(200).send({
          message: "Usuario no encontrado",
          success: false,
        });
      }
  
      // El usuario existe, ahora puedes acceder a sus propiedades
      admin.password = undefined;
  
      res.status(200).send({
        success: true,
        data: admin,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Auth error",
        success: false,
        error,
      });
    }
  };

  // Controlador para crear un nuevo producto
const createProducto = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;
    const newProduct = await productosModel.create({ productName, productDescription });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controlador para obtener todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await productosModel.find();
    res.status(200).json({ success: true, data: productos });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
      let productImage = '';
      if (req.file) {
          productImage = req.file.filename;
      }

      const { productName, productDescription } = req.body;
      const newProduct = new productosModel({
          productName: productName,
          productDescription: productDescription,
          productImage: productImage,
      });

      await newProduct.save();

      res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
};

// Controlador para obtener la imagen de un producto por su ID
const getProductImageById = async (req, res) => {
  try {
      const product = await productosModel.findById(req.params.id);
      if (product && product.productImage) {
          const imagePath = path.join(__dirname, '..', 'uploads', product.productImage);
          res.sendFile(imagePath);
      } else {
          throw new Error('El producto no tiene una imagen asociada.');
      }
  } catch (error) {
      console.error('Error al obtener la imagen del producto:', error);
      res.status(500).json({ message: 'Error al obtener la imagen del producto', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productosModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar producto', error: error.message });
  }
};

module.exports = { loginController, addProduct, getProductImageById, createProducto, getAllProductos, deleteProduct };
