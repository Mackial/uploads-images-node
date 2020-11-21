const { Router } = require('express');

const router = Router();

// MULTER nos permite subir imagenes
const multer = require('multer');

const path = require('path');

const { v4: uuidv4 } = require('uuid');

// Indicamos como almacenar las imagenes
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images'),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());  // Usar un generador de nombres unico 
  }
});

// Routes
router.get('/', (req, res) => {
  res.render('index');
});
// milddeware
const upload = multer({
  storage: storage,
  // Si no existe la carpeta en la ruta, lo crea automaticamente
  dest: path.join(__dirname, 'public/images'), //destino
  limits: {fileSize: 10000000}, // Limite permitido para el tamaño del archivo
  fileFilter: (req, file, cb) => { // Validar el tipo de archivos
    const filetypes = /jpeg|jpg|png|gif/; // Archivos soportados  
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error, Archivo no soportado");
  }
  }).single('image'); // Decimos como recibir imagenes, una o varias, en este caso una
  // Colocamos el nombre del input que contiene la imagen

router.post('/upload', upload
,(req, res) => { // Recibe el formulario del metodo post
  console.log(req.file);
  res.send('uploaded');
});

module.exports = router;