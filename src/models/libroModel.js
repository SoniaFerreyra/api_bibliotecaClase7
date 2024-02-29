const mongoose = require('mongoose');
require('dotenv').config();

<<<<<<< HEAD
mongoose.connect('mongodb://localhost:27017/biblioteca', {
=======
console.log(process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB, {
>>>>>>> c3045eb11f4edd2302bcae71d89c06c321acfe14
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
  


const LibroSchema = new mongoose.Schema({
  titulo: String,
  autor: String

}, { collection: 'libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;