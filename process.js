'use strict';

const { showResult } = require('./model.js');



//comunicación entre el padre y el evento del hijo. Zona de exclusion mutua
process.on('message', (msg) => {
    console.log(`Hijo recibe la cadena: ${msg}`);
 
    let result;
    let arr = msg.split(" ");

    // console.log(arr);
    let num1 = arr[0];
    let operator = arr[1];
    let num2 = arr[2];
    
    if (operator === 'SUMA') {
        result = Number(num1) + Number(num2);
    } else if (operator === 'RESTA') {
        result = Number(num1) - Number(num2);
    } else if (operator === 'MULTI') {
        result = Number(num1) * Number(num2);
    } else if (operator === 'DIVI') {
        result = Number(num1) / Number(num2);
    } else {
       result = "Operación desconocida";     
       //process.exit(-1);
    }

    console.log(`Resultado = ${result}`);
    console.log('Hijo se desconecta');
    // process.send(result);
    process.disconnect();
 });