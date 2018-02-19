'use strict';

const express = require('express');
const router = express.Router();
const { showResult } = require('./model.js');

router.use(function timeLog (req, res, next) {
    console.log('Hora:' , Date.now());
    next();
});

//Ejemplo: GET http://localhost:8000/calculadora/padre
router.get('/padre', (req, res) => {
    res.status(200);
    res.send("Hola soy el padre");
});

//Ejemplo: GET http://localhost:8000/calculadora/padre/hijo
router.get('/padre/hijo', (req, res) => {
    res.status(404);
    res.send("Aquí no hay nada");

});

//Ejemplo: POST http://localhost:8000/calculadora/hijo
// {
//     "oper": "SUMA",
//     "num1": "1",
//     "num2": "20"
// }
router.post('/hijo', function(req, res) {
    let operation = req.body.oper;
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let global = num1 + ' ' + operation + ' '+ num2;

    let result = req.app.get('child').send(global); 
    showResult();  //Aquí debería manejar el resultado??
    res.json(result);
 });



//Exportamos el módulo
module.exports = router;