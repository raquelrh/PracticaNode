'use strict';

//Cargamos el módulo
const express = require('express');
const bodyParser = require('body-parser');
const { fork } = require('child_process');

const port = 8000;

//Cargamos el router
const router = require('./router.js');
const childUrl = 'process.js';
const child = fork(childUrl);

//creamos el módulo instánciandolo
const app = express();

app.set('child', child);
//Le indicamos que parsee el json
app.use(bodyParser.json()); //Usar middleware. Para manejar la petición de entrada.
app.use('/calculadora', router);

//Maneja error de cualquier ruta no definida
app.use("*", function(req, res) {
  res.status(404).send('Error 404. La ruta no existe');
});

//Lanzamos el servidor
app.listen(port);