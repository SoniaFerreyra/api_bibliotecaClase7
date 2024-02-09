const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
  

const LibroSchema = new mongoose.Schema({
  titulo: String,
  autor: String

}, { collection: 'libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;