'use strict';

const express = require('express'); //Necesario para cargar el módulo
// const bodyParser = require('body-parser');

const port = 8000; //process.env.PORT;

const app = express(); //creamos el módulo

//Le indicamos que parsee el json
// app.use(bodyParser.json()); //Usar middleware. Para manejar la petición de entrada. 

app.get('/', function(req, res){
    res.json({ mensaje: 'Un ejemplo de nodejs y express'});
  });

//Lanzamos el servidor
app.listen(port);

//node server.js para lanzarlo