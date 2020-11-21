const express = require('express');
// Este modulo no es necesario declararlo ps express se encarga de reconocerlo

//const ejs = require('ejs');
// Este sirve para unir directorios
const path = require('path'); // PATH es un modulo propio de NODEJS


// Initializations
const app = express();

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  //Motor de vistas usando ejs, con 

// Milddkewares : Se ejecutan antes de llegar a las rutas para validar dato

// Routes
app.use(require('./Routes/index'));

// Static files : signamos una ruta publica para que acceda cualquiera
app.use(express.static(path.join(__dirname, 'public')));


// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')} http://localhost:3000`);
});