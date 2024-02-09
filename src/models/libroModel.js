const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

const LibroSchema = new mongoose.Schema({
  titulo: String,
  autor: String

}, { collection: 'libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;