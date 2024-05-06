const express = require("express");

const app = express();

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");

//carga las variables de entorno .env
require('dotenv').config();


// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE, //http://localhost:3000/api/productos,
  issuerBaseURL: process.env.OAUTH_URL, //https://dev-utn-frc-iaew.auth0.com/
  tokenSigningAlg: "RS256",
});


app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

//Configuramos el middleware de autenticacion
//puse libros en vez de biblioteca
app.use("/api/libros", autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;