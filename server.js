'use strict';

//Cargamos el módulo
const express = require('express');
const bodyParser = require('body-parser');
const {fork} = require('child_process');

const port = 8000; //process.env.PORT;

//Cargamos el router
const router = require('./router.js');
const childUrl = 'process.js';

const child = fork(childUrl);

//creamos el módulo instánciandolo
const app = express(); 

app.set('child', child);
//Le indicamos que parsee el json
app.use(bodyParser.json()); //Usar middleware. Para manejar la petición de entrada.
app.use('/juega', router);

child.on('message', (msg) => {
  console.log(`${msg.mensaje}`);
  setTimeout(() => {
    child.send({
      'mensaje': 'Ping'
    });
  }, 1000);
});

child.send({
  'mensaje': 'Ping'
});

//Lanzamos el servidor
app.listen(port);