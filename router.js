'use strict';

const express = require('express');
const router = express.Router();

const { getResult } = require('./process.js');

function logger(req, res, next) {
  console.log(Date.now(), req.method, req.url);
  next();
}

router.use(logger);


router.get('/', (req, res) => {
  let data = {
    routes: {
      '/padre': {
        methods: ['GET']
      },
      '/padre/hijo': {
        methods: ['GET', 'POST']
      }
    }
  };
  res.json(data);
});

//Ejemplo: GET http://localhost:8000/calculadora/padre
router.get('/padre', (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    return res.sendStatus(400);
  } else {
    res.status(200);
    res.send('Servicio Calculadora');
  }
});

//Ejemplo: GET Cpadre/hijo
router.get('/padre/hijo', (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    return res.sendStatus(400);
  } else {
    res.status(200);
    res.send('Post JSON: <br>{oper: [+-*/], num1: [0-9], num2: [0-9], result: [0-9]}');
  }
});

//Ejemplo: POST http://localhost:8000/calculadora/padre/hijo
/* {
     "oper": "+",
     "num1": "1",
     "num2": "20",
     "result": "0"
 } */
router.post('/padre/hijo', function(req, res) {

  let proccesChild = req.app.get('child');
  let data = req.body;
  //Envio datos al hijo para que haga la operación
  proccesChild.send(data);

  proccesChild.on('message', (msg) => {
    //Estado del hijo con resultado de la operación
    console.log("En el padre el resultado = " + msg.result);
    if (msg.result == 'Fallo') {
      //res.json("Estado:" + res.statusCode);
      res.status(500).json("{ resultado: " + msg.result + " }");
    } else {
      res.status(200).json("{ resultado: " + msg.result + " }");
    }
    //res.json("{ estado:" + res.statusCode + ", resultado: " + msg.result + " }");
  });
});


//Exportamos el módulo
module.exports = router;