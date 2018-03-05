# Práctica Node

Desarrollo de un servidor HTTP en Node.js junto con Express que lanza un proceso y se comunica con él.

Práctica desarrollada para el Curso de Experto en Full-stack de la Universidad de Salamanca


## Grupo Avengers
### Componentes
+ Oscar Pérez Riaño [[@osperi](https://github.com/osperi)]
+ Héctor Rodríguez Iglesias [[@hectorri](https://github.com/hectorri)]
+ Raquel Rodríguez Hernández [[@raquelrh](https://github.com/raquelrh)]

# Descripción de la Práctica

La práctica desarrollada se basa en la comunicación de dos procesos, padre e hijo que implementan una calculadora. 

El padre le pasa la operación y dos operandos y el hijo realiza el cálculo y se lo devuelve.

Se han implementado endpoints para GET y POST. A través de la petición POST, el servidor se comunica con el padre que pasa los datos al hijo para que realice el cálculo. El proceso hijo devuelve al padre el resultado que le envia al cliente la respuesta.

La estructura del JSON usado para el post es el siguiente:

{
  oper: "+" 
  num1: "9"
  num2: "5"
  result: ""
}

