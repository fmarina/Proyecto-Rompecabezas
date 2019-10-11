var instrucciones = ["Utilizar las flechas para mover las piezas", 
                     "Ordenar las piezas hasta alcanzar la imagen objetivo"];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];
// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(instrucciones) {
    for(var i = 0; i < instrucciones.length; i++){
      var instruccion = instrucciones[i];
      mostrarInstruccionEnLista(instruccion, "lista-instrucciones");
    }
}

function mostrarUltimoMovimiento(direccionMovimiento){
  var ultimoMovimiento = movimientos.push(direccionMovimiento);
   actualizarUltimoMovimiento(direccionMovimiento);
}

//variable con los ultimos movimientos
var mensaje;
//funcion que muestra los ultimos movimientos realizados
function ultimosMovimientos(array){
  var lastMove = [];
  var largoVector = array.length;  
  if(largoVector > 5){
    for(var i = largoVector - 1; i >= largoVector - 5; i--){     
      var valor = transformarMovimiento(array[i]);
      lastMove.push(valor);
    }
    var lastMoveString = lastMove.toString();
    mensaje = lastMoveString;
  }
  else{
    for(var i = 0; i < largoVector; i++){
      var valor = transformarMovimiento(array[i]);
      lastMove.push(valor);
    }
    var lastMoveString = lastMove.toString();
    mensaje = lastMoveString;
  }  
}
function transformarMovimiento(movimiento){
  var mov;
  switch(movimiento){
    case 37: 
      mov = "Izquierda";
      break;
    case 38: 
    mov = "Arriba";
      break;
    case 39: 
      mov = "Derecha";
      break;
    case 40: 
      mov = "Abajo";
      break;
    default: 
      mov = "Movimiento desconocido";
      break;
  }
  return mov;
}

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. 
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano(){
  var grillaGanadora = [
          [1,2,3],
          [4,5,6],
          [7,8,9],
  ];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (grilla[i][j] != grillaGanadora[i][j]){
        return false;
      }
    }
  }
  return true;
}

// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego
function mostrarCartelGanador() {
  $("#exampleModalCenter").modal("show");
  var modalFooter = document.getElementById("modal-footer1");
  modalFooter.innerHTML = "Movimientos realizados: " + contadorMovimientosTeclas;
  contadorMovimientosTeclas = 0;
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pieza1 = grilla[filaPos1][columnaPos1];
    var pieza2 = grilla[filaPos2][columnaPos2];
    grilla[filaPos1][columnaPos1] = pieza2;
    grilla[filaPos2][columnaPos2] = pieza1;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}

// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    if(fila >= 0 && fila < 3 && columna >= 0 && columna < 3){
      return true
    }
    else{
      return false;
    }
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento. */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaColumnaPiezaVacia = columnaVacia - 1;
    nuevaFilaPiezaVacia = filaVacia;
  }
    
  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaColumnaPiezaVacia = columnaVacia + 1;
    nuevaFilaPiezaVacia = filaVacia;
  }

  // A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        mostrarUltimoMovimiento(direccion);
    }
}

//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

//Funcion que realiza el logico (en la grilla) y ademas actualiza en la pantalla (DOM).
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  //  posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

//posiciones de los elementos del DOM que representan las fichas en la pantalla

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  //  posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. Se mezclara el tablero*/

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}

// capturarTeclas: Esta función captura las teclas presionadas por el usuario.
var contadorMovimientosTeclas = 0;

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {
      
      contadorMovimientosTeclas++;  
      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas  */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();