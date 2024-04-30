const express = require("express");
const router = express.Router();
const blogsCtrl = require("../controllers/blogsCtrl");
const upload = require('../config/storage');

router.get("/", blogsCtrl.getBlogs);
router.get("/:id", blogsCtrl.getBlogById);
router.post("/", upload.single('imagenBlog'), blogsCtrl.createBlog);
router.put("/:id", upload.single('imagenBlog'), blogsCtrl.updateBlog);
router.delete("/:id", blogsCtrl.deleteBlog);

module.exports = router;
