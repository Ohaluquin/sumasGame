// JavaScript for Math Game

//const timerSound = new Audio('timer-sound.mp3');
//const correctSound = new Audio('correct-sound.mp3');
//const incorrectSound = new Audio('incorrect-sound.mp3');

// Initialize game variables
let timer;
let score = 0;
let currentQuestion;

window.onload = function() {
  startGame();
};

let maxNumber = 9; // Variable global para controlar el número máximo en las preguntas
let num1=0;
let num2=0;

function generateQuestion() {
  let lastNum1 = num1;
  let lastNum2 = num2;
  // Generar dos números aleatorios entre 1 y maxNumber
  num1 = Math.floor(Math.random() * maxNumber) + maxNumber-8;
  while (num1 === lastNum1) {
    num1 = Math.floor(Math.random() * maxNumber) + maxNumber-8;
  }
  num2 = Math.floor(Math.random() * maxNumber) + maxNumber-8;
  while (num2 === lastNum2) {
    num2 = Math.floor(Math.random() * maxNumber) + maxNumber-8;
  }
  // Actualizar el área de la pregunta con la nueva pregunta
  const questionArea = document.getElementById('questionArea');
  questionArea.textContent = `¿Cuánto es ${num1} + ${num2}? `;

  // Guardar la respuesta correcta en una variable (podría ser una variable global)
  currentQuestion = num1 + num2;
}


function handleInput(input) {
  // Comprobar si la respuesta del usuario es correcta
  if (input === currentQuestion) {
    // Aumentar la puntuación
    score++;
    //correctSound.play();
    playSound(500, 0.5);
    updateMetrics();

    // Opcionalmente, aumentar la dificultad (por ejemplo, aumentar maxNumber)
    if (score % 5 === 0) { // cada 5 respuestas correctas
      maxNumber += 10;
      timerDuration--;
      updateMetrics();
    }
    
    // Generar una nueva pregunta y reiniciar el temporizador
    generateQuestion();
    remainingTime = timerDuration;
  } else {
    // Restar una vida si la respuesta es incorrecta
    lives--;
    //incorrectSound.play();
    playSound(100, 0.5);
    updateMetrics();

    // Comprobar si quedan vidas
    if (lives <= 0) {
      // Terminar el juego si no quedan vidas
      endGame();
    } else {
      // Opcional: Generar una nueva pregunta y reiniciar el temporizador
      generateQuestion();
      remainingTime = timerDuration;
    }
  }
}


let timerDuration = 10; // Duración del temporizador en segundos
let remainingTime = timerDuration; // Tiempo restante
let lives = 3; // Número inicial de vidas

function updateTimer() {
  // Actualizar el área del temporizador
  const timerArea = document.getElementById('timerArea');
  timerArea.textContent = `Tiempo restante: ${remainingTime}s`;

  // Verificar si el tiempo se ha agotado
  if (remainingTime <= 0) {
    // Restar una vida
    lives--;
    updateMetrics();    

    // Comprobar si quedan vidas
    if (lives <= 0) {
      // Terminar el juego si no quedan vidas
      endGame();
    } else {
      // Generar una nueva pregunta y reiniciar el temporizador
      generateQuestion();
      remainingTime = timerDuration;
    }
  }
  // Disminuir el tiempo restante
  remainingTime--;
  //timerSound.play();
  playSound(200, 0.2);
}

function startGame() {
  // Reiniciar todas las variables del juego
  score = 0;
  lives = 3;
  maxNumber = 9;
  timerDuration = 10;
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
  // Detener el temporizador
  clearInterval(timer);

  // Mostrar el puntaje final
  const statusArea = document.getElementById('statusArea');
  statusArea.innerHTML = `Juego terminado. Tu puntuación final es: ${score}`;

  // Opcionales: Mostrar mensajes según el desempeño, botón de reinicio, etc.
  if (score < 10) {
    statusArea.innerHTML += '<br>¡Sigue practicando!';
  } else if (score < 15) {
    statusArea.innerHTML += '<br>¡Casi lo logras, inténtalo de nuevo!';
  } else {
    statusArea.innerHTML += '<br>¡Buen trabajo!';
  }

  // Botón de reinicio
  statusArea.innerHTML += '<br><button onclick="startGame()">Jugar de nuevo</button>';
}


let currentInput = ""; // Variable global para almacenar la entrada del usuario

function appendToInput(value) {
  // Añadir el valor al input actual
  currentInput += value;

  // Actualizar el campo de entrada en el HTML
  const userInput = document.getElementById('userInput');
  userInput.value = currentInput;
}

function submitInput() {
  // Convertir la entrada del usuario a un número
  const numericalInput = parseFloat(currentInput);

  // Pasar la entrada a handleInput para su verificación
  handleInput(numericalInput);

  // Limpiar el campo de entrada para la próxima pregunta
  currentInput = "";
  const userInput = document.getElementById('userInput');
  userInput.value = currentInput;
}


function updateMetrics() {
  const scoreArea = document.getElementById('scoreArea');
  scoreArea.textContent = `Puntuación: ${score}`;

  const difficultyArea = document.getElementById('difficultyArea');
  if (maxNumber <= 20) {
    difficultyArea.textContent = "Nivel: Fácil";
  } else if (maxNumber <= 40) {
    difficultyArea.textContent = "Nivel: Intermedio";
  } else {
    difficultyArea.textContent = "Nivel: Difícil";
  }

  const livesArea = document.getElementById('livesArea');
  livesArea.textContent = `Vidas: ${lives}`;
}


function deleteLastInput() {
  // Eliminar el último carácter de la entrada actual
  currentInput = currentInput.slice(0, -1);

  // Actualizar el campo de entrada en el HTML
  const userInput = document.getElementById('userInput');
  userInput.value = currentInput;
}

function playSound(frequency, duration) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();

  oscillator.type = 'sine';  // Tipo de onda
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frecuencia en Hz
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}
