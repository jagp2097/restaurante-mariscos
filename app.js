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
const adminsRoutes = require('./routes/AdminsRoutes');

// servir los archivos estaticamente
app.use(express.static(path.join(path.dirname(require.main.filename), 'public')));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Permitimos a la aplicación el acceso a las rutas 
app.use(platillosRoutes);
app.use(adminsRoutes);

// Puerto donde estará escuchando la aplicación
app.listen(3000);