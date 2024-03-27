// JavaScript for Math Game
const timerSound = new Audio('tick.mp3');
//const correctSound = new Audio('correct_sound.mp3');
const incorrectSound = new Audio('error_sound.mp3');

// Initialize game variables
let timer;
let score = 0;
let currentQuestion;

window.onload = function() {
  score = -1; // -1 para que ponga un mensaje inicial
  endGame(); 
};

let maxNumber; // Variable global para controlar el número máximo en las preguntas
let minNumber; // Variable global para controlar el número mínimo en las preguntas
let timerDuration; // Duración del temporizador en segundos
let remainingTime = timerDuration; // Tiempo restante
let lives; // Número inicial de vidas
let num1=0;
let num2=0;
let roundNumber = false;

function generateQuestion() {
  let lastNum1 = num1;
  let lastNum2 = num2;
  // Generar dos números aleatorios entre 1 y maxNumber
  num1 = Math.floor(Math.random() * maxNumber) + minNumber;
  while (num1 === lastNum1) {
    num1 = Math.floor(Math.random() * maxNumber) + minNumber;
  }
  num2 = Math.floor(Math.random() * maxNumber) + minNumber;
  while (num2 === lastNum2) {
    num2 = Math.floor(Math.random() * maxNumber) + minNumber;
  }
  if(roundNumber) num2 = num2*5;
  // Actualizar el área de la pregunta con la nueva pregunta
  const questionArea = document.getElementById('questionArea');
  questionArea.textContent = `${num1} + ${num2} = `;
  currentQuestion = num1 + num2; // Guardar la respuesta correcta en una variable
}

function handleInput(input) {
  if (input === currentQuestion) { // Comprobar si la respuesta del usuario es correcta
    score++; // Aumentar la puntuación
    //correctSound.play();
    if(score==6) {//En el nivel tres practicar agregando decenas
      roundNumber = true;             
      }
    else if (score%3 === 0) { // cada 3 respuestas correctas aumentar la dificultad
      roundNumber = false;
      maxNumber += 4;
      minNumber += 3;
      if (score%6 === 0) { // cada 6 respuestas correctas se reduce el tiempo
        timerDuration--;
      }      
    }
    updateMetrics();
    generateQuestion(); // Generar una nueva pregunta y reiniciar el temporizador
    remainingTime = timerDuration;
  } else {
    lives--; // Restar una vida si la respuesta es incorrecta
    incorrectSound.play();
    updateMetrics();
    if (lives <= 0) { // Comprobar si quedan vidas
      endGame(); // Terminar el juego si no quedan vidas
    } else { // Opcional: Generar una nueva pregunta y reiniciar el temporizador
      generateQuestion();
      remainingTime = timerDuration;
    }
  }
}

function updateTimer() {  
  const timerArea = document.getElementById('timerArea');
  timerArea.textContent = `Tiempo: ${remainingTime}s`; // Actualizar el área del temporizador
  if (remainingTime <= 0) { // Verificar si el tiempo se ha agotado
    lives--; // Restar una vida
    incorrectSound.play();
    updateMetrics();    
    if (lives <= 0) { // Comprobar si quedan vidas
      endGame(); // Terminar el juego si no quedan vidas
    } else { // Generar una nueva pregunta y reiniciar el temporizador
      generateQuestion();
      remainingTime = timerDuration;
    }
  }
  remainingTime--; // Disminuir el tiempo restante
  timerSound.play();
}

function startGame() {
  // Reiniciar todas las variables del juego
  score = 0;
  lives = 3;
  maxNumber = 5;
  minNumber = 1;
  timerDuration = 12;
  remainingTime = timerDuration;
  // Limpiar los mensajes y el área de estado
  const statusArea = document.getElementById('statusArea');
  statusArea.innerHTML = "";  
  const userInput = document.getElementById('userInput');
  userInput.value = "";
  // Iniciar el temporizador
  timer = setInterval(updateTimer, 1000); // Llama a updateTimer cada segundo
  // Generar la primera pregunta
  generateQuestion();
}

function endGame() {
  clearInterval(timer); // Detener el temporizador  
  const statusArea = document.getElementById('statusArea');  // Mostrar el puntaje final
  if(score>=0) statusArea.innerHTML = `Juego terminado. Tu puntuación final es: ${score}`;
  if (score <0) { // Opcionales: Mostrar mensajes según el desempeño, botón de reinicio, etc.
    statusArea.innerHTML += '<br>¡Presiona el botón para iniciar!';
  } else if(score < 15) {
    statusArea.innerHTML += '<br>¡Sigue practicando!';
  } else if (score < 25) {
    statusArea.innerHTML += '<br>¡Casi lo logras, inténtalo de nuevo!';
  } else {
    statusArea.innerHTML += '<br>¡Buen trabajo!';
  }
  if(score>=0) {  // Botón de reinicio
    statusArea.style.display = 'block';
    statusArea.innerHTML += '<br><button onclick="startGame()">Jugar de nuevo</button>';
    // Mostrar el mensaje de fin de juego
    var randomTipIndex = Math.floor(Math.random() * tipsForImprovement.length);
    var tipToShow = tipsForImprovement[randomTipIndex];
    // Actualizar el contenedor del mensaje de fin de juego y mostrarlo
    statusArea.innerHTML += "<p>Consejo para mejorar:<br> " + tipToShow + "</p>";
    }
  else statusArea.innerHTML += '<br><button onclick="startGame()">Jugar</button>';
}

let currentInput = ""; // Variable global para almacenar la entrada del usuario

function appendToInput(value) {
  if(score<0 || lives<=0) return;
  currentInput += value; // Añadir el valor al input actual
  const userInput = document.getElementById('userInput'); // Actualizar el campo de entrada en el HTML
  userInput.value = currentInput;
}

function submitInput() {
  if(score<0 || lives<=0) return;
  const numericalInput = parseFloat(currentInput); // Convertir la entrada del usuario a un número
  handleInput(numericalInput); // Pasar la entrada a handleInput para su verificación
  currentInput = ""; // Limpiar el campo de entrada para la próxima pregunta
  const userInput = document.getElementById('userInput');
  userInput.value = currentInput;
}


function updateMetrics() {
  const scoreArea = document.getElementById('scoreArea');
  scoreArea.textContent = `Puntuación: ${score}`;
  const difficultyArea = document.getElementById('difficultyArea');
  let levelImage = document.getElementById('levelImage');
  if (score <= 10) {
    difficultyArea.textContent = "Nivel: Principiante";
    levelImage.src = 'principiante.png';
  } else if (score <= 20) {
    difficultyArea.textContent = "Nivel: Fácil";
    levelImage.src = 'facil.png';
  } else if (score <= 30) {
    difficultyArea.textContent = "Nivel: Intermedio";
    levelImage.src = 'intermedio.png';
  } else if (score <= 40) {
    difficultyArea.textContent = "Nivel: Difícil";
    levelImage.src = 'dificil.png';
  } else {
    difficultyArea.textContent = "Experto";
    levelImage.src = 'experto.png';
  }
  const livesArea = document.getElementById('livesArea');
  livesArea.textContent = `Vidas: ${lives}`;
}

function deleteLastInput() {
  currentInput = currentInput.slice(0, -1); // Eliminar el último carácter de la entrada actual
  const userInput = document.getElementById('userInput'); // Actualizar el campo de entrada en el HTML
  userInput.value = currentInput;
}

// Lista de consejos para mejorar en sumas
const tipsForImprovement = [
  "Recuerda que sumar de cinco en cinco puede simplificar cómo haces tus cálculos.",
  "Redondea y ajusta: Intenta redondear el número más grande al múltiplo de diez más cercano y ajusta después. Por ejemplo, 68+23 se parece a 70+23=93 y ajustas a 91",
  "Complementos: Identifica los complementos de cinco y diez, son muy útiles para unir los números como si fueran rompecabezas.",
  "Duplicar: Practica duplicar cualquier número, te puede facilitar los calculos.",
  "Conmutativa: Si eliges primero el número mayor y luego añades el menor, es más rápido el cálculo.",
  "Usa casi dobles: Por ejemplo, si sabes que el doble de 8 es 16, calcula 8+9 pensando que es uno más.",
  "Suma en etapas: Por ejemplo, para sumar 58+27, primero suma 50+20=70, y luego 8+7=15, finalmente 70+15=85.",
  "Descomponer: Separa los números para formar bloques que puedan sumarse fácilmente. Por ejemplo, 9+7=9+1+6=16"
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}