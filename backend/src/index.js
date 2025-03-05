import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";
import dotenv from "dotenv";

dotenv.config();
connectDb();

import recipeRoute from "./routes/recetas.routes.js";

const app = express();

app.set("Port", process.env.PORT);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/recipes", recipeRoute);

app.listen(app.get("Port"), () => {
  console.log("Escuchando por el puerto", app.get("Port"));
});
