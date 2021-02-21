// modulo para armar paths
const path = require('path');

const express = require('express');

const app = express();

// Template engine usado por la aplicación
app.set('view engine', 'ejs');

// Carpeta donde se almacenan las vistas de la aplicación
app.set('views', 'views');

// Rutas que accedera el usuario
const platillosRoutes = require('./routes/PlatillosRoutes');

// servir los archivos estaticamente
app.use(express.static(path.join(path.dirname(require.main.filename), 'public')));

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const init = () => {

    // Permitimos a la aplicación el acceso a las rutas 
    app.use(platillosRoutes);

    // Puerto donde estará escuchando la aplicación
    app.listen(3000);

};

init();