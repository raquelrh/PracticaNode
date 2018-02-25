'use strict';

const express = require('express');
const router = express.Router();

function logger (req, res, next) {
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
                methods: ['GET','POST']
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

// router.get('/padre/:oper/:num1/:num2', function(req, res) {
//     res.send('La operación que vas a realizar desde el padre es una ' + req.params.oper);

//     let operation = req.params.oper;
//     let num1 = req.params.num1;
//     let num2 = req.params.num2;
//     let global = num1 + ' ' + operation.toUpperCase() + ' '+ num2;

//     let result = req.app.get('child').send(global); 
 
//     res.send('El resultado es = ' + req.params.oper);
// });

//Ejemplo: GET http://localhost:8000/calculadora/padre/hijo
router.get('/padre/hijo', (req, res) => {
    res.status(404);
    res.send("Aquí no se hace nada");
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

    //Envio datos al hijo para que haga la operación
    let result = proccesChild.send(req.body); 
    
    proccesChild.on('message', (msg) => {
        //Estado del hijo con resultado de la operación       
        console.log("En el padre el resultado = " + msg.result);
        if(msg.result == 'Fallo') {
            res.status(400);
            res.json("Estado:" + res.statusCode);
        } else {
            res.status(200);
            res.json("Estado:" + res.statusCode + "\nResultado de la operación = " + msg.result );
        }       
    });
 });

//Exportamos el módulo
module.exports = router;