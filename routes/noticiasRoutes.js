const express = require("express");
const router = express.Router();
const noticiasCtrl = require("../controllers/noticiasCtrl");
const upload = require('../config/storage');

router.get("/", noticiasCtrl.getNoticias);
router.get("/:id", noticiasCtrl.getNoticiaById);
router.post("/", upload.single('imagenNoticia'), noticiasCtrl.createNoticia); // Cambio de 'imagen' a 'imagenNoticia'
router.put("/:id", upload.single('imagenNoticia'), noticiasCtrl.updateNoticia); // Cambio de 'imagen' a 'imagenNoticia'
router.delete("/:id", noticiasCtrl.deleteNoticia);

module.exports = router;
