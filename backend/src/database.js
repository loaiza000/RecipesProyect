import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/recipes");
    console.log("MongoDB conectado:", {
      host: conn.connection.host,
      port: conn.connection.port,
      name: conn.connection.name,
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};
