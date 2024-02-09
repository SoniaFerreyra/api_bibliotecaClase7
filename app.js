const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./src/middlewares/errorHandler");

//carga las variables de entorno .env
require('dotenv').config();

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE, //http://localhost:3000/api/productos,
  issuerBaseURL: process.env.OAUTH_URL, //https://dev-utn-frc-iaew.auth0.com/
  tokenSigningAlg: "RS256",
});


const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./src/routes/libros");

//Configuramos el middleware de autenticacion
app.use("/api/biblioteca", autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

