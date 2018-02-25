'use strict';

let result = 0 ;

//comunicación entre el padre y el evento del hijo. Zona de exclusion mutua
process.on('message', (msg) => {

    console.log(`Hijo recibe la operación: ${msg.oper}`);

    if(msg.oper != '' && msg.oper != undefined) {

        let num1 =  msg.num1;
        let operator =  msg.oper;
        let num2 =  msg.num2;

        //Se realiza la operación indicada
        if (operator === '+') {
            result = Number(num1) + Number(num2);
        } else if (operator === '-') {
            result = Number(num1) - Number(num2);
        } else if (operator === '*') {
            result = Number(num1) * Number(num2);
        } else if (operator === '/') {
            result = Number(num1) / Number(num2);
        } else {
            msg.result = "Fallo";
        }       
    } else {
        msg.result = "Fallo";
    }
   
    if(msg.result != "Fallo") {
        msg.result = result;    
    }   

    console.log(`Resultado en HIJO = ${result}`);
    
    process.send(msg);
    //process.exit(result);
    console.log('Hijo envia resultado');
    //process.disconnect();
 });


  
