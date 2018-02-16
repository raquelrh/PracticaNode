'use strict';


//comunicación entre el padre y el evento del hijo. Zona de exclusion mutua
process.on('message', (msg) => {
    console.log(`${msg.mensaje}`);
    setTimeout(() =>{
        process.send({
            'mensaje': 'Pong'
        });
    }, 1000);
});