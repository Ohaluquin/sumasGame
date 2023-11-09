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

let maxNumber = 5; // Variable global para controlar el número máximo en las preguntas
let minNumber = 1; // Variable global para controlar el número mínimo en las preguntas
let timerDuration = 15; // Duración del temporizador en segundos
let remainingTime = timerDuration; // Tiempo restante
let lives = 3; // Número inicial de vidas
let num1=0;
let num2=0;

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
  // Actualizar el área de la pregunta con la nueva pregunta
  const questionArea = document.getElementById('questionArea');
  questionArea.textContent = `¿Cuánto es ${num1} + ${num2}? `;

  // Guardar la respuesta correcta en una variable (podría ser una variable global)
  currentQuestion = num1 + num2;
}


function handleInput(input) {
  // Comprobar si la respuesta del usuario es correcta
  if (input === currentQuestion) {
    score++; // Aumentar la puntuación
    //correctSound.play();

    // Opcionalmente, aumentar la dificultad
    if (score % 3 === 0) { // cada 3 respuestas correctas
      maxNumber += 5;
      minNumber += 3;
      if (score % 6 === 0) { // cada 10 respuestas correctas
        timerDuration--;
      }
    }
    updateMetrics();

    // Generar una nueva pregunta y reiniciar el temporizador
    generateQuestion();
    remainingTime = timerDuration;
  } else {
    // Restar una vida si la respuesta es incorrecta
    lives--;
    //incorrectSound.play();
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
  // Detener el temporizador
  clearInterval(timer);

  // Mostrar el puntaje final
  const statusArea = document.getElementById('statusArea');
  statusArea.innerHTML = `Juego terminado. Tu puntuación final es: ${score}`;

  // Opcionales: Mostrar mensajes según el desempeño, botón de reinicio, etc.
  if (score < 15) {
    statusArea.innerHTML += '<br>¡Sigue practicando!';
  } else if (score < 25) {
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
  // Eliminar el último carácter de la entrada actual
  currentInput = currentInput.slice(0, -1);

  // Actualizar el campo de entrada en el HTML
  const userInput = document.getElementById('userInput');
  userInput.value = currentInput;
}
