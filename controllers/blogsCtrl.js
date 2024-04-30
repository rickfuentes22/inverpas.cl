const blogsModel = require("../models/blogsModel");

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blogsModel.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await blogsModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrada" });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        let imagenBlog = '';
        if (req.file) {
            imagenBlog = req.file.filename;
        }

        const { title, content } = req.body;

        const newBlog = await blogsModel.create({ title, content, imagenBlog });

        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const imagenBlog = req.file ? req.file.filename : null;

        const updatedBlog = await blogsModel.findByIdAndUpdate(
            req.params.id,
            { title, content, imagenBlog },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog no encontrada" });
        }

        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await blogsModel.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog no encontrada" });
        }
        res.json({ message: "Blog eliminada" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
