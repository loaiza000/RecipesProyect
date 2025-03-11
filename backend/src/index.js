import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./database.js";
import recetasRoutes from "./routes/recetas.routes.js";

const app = express();
const port = 5000;

// Middlewares
app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());

// Test route
// app.get("/test", (req, res) => {
//   console.log("Test route hit");
//   res.json({ message: "API is working" });
// });

// Routes
app.use("/", recetasRoutes);

// Error handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(500).json({
//     ok: false,
//     data: null,
//     message: err.message || "Error interno del servidor"
//   });
// });

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
      console.log("Rutas disponibles:");
      console.log("- GET /test");
      console.log("- GET /recipes");
      console.log("- POST /recipes");
      console.log("- DELETE /recipes/:id");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
