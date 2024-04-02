const express = require("express");
const {
    loginController
} = require("../controllers/adminCtrl");

const router = express.Router();

// Ruta para el registro de administradores

// Ruta para el inicio de sesión de administradores
router.post("/login", loginController);

module.exports = router;
