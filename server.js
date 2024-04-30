const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

// Configuración de dotenv
dotenv.config();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/contacto", require("./routes/contactoRoutes"));
app.use("/api/noticias", require("./routes/noticiasRoutes"));
app.use("/api/blogs", require("./routes/blogsRoutes"));


app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})


// Configuración del puerto
const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server corriendo en ${process.env.NODE_MODE} Mode en port ${process.env.PORT}`.bgCyan.white
  );
});
