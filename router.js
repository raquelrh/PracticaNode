'use strict';

const express = require('express');
const router = express.Router();
const { play } = require ('./process.js');

router.get('/padre', (req, res) => {
    res.send("Hola soy el padre y voy a jugar al Ping Pong");
    // play().then((data) => {
    //     res.json(data);
    // }); 
});


//Exportamos el módulo
module.exports = router;