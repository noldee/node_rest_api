import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

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

// Leer datos del formulario
server.use(express.json());

// Rutas de todos mis endpoints
server.use("/api/products", router);

// Documentación
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
