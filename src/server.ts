import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";
import cors, { CorsOptions } from "cors";

// Conectar a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conexión Exitosa");
  } catch (error) {
    console.error(error);
    console.log("Hubo un error al conectar la base de datos");
  }
}

connectDB();

// Instancia de express
const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

// Leer datos del formulario
server.use(express.json());

// Rutas de todos mis endpoints
server.use("/api/products", router);

// Documentación
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
