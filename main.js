var canvas;
var ctx;

var width = 800;
var height = 600;
var color = "black";
var direction = "right";
var apple = { x: 15, y: 15 };
var snake = [];
var gameInterval;
var speedSlider;
var score = 0;
var startTime;

window.onload = function() {
  setTitle();
  drawCanvas();
  snake = snakeInit();
  drawSnake();
  drawApple();

  speedSlider = document.getElementById("speedSlider");
  speedSlider.addEventListener("input", handleSpeedChange);

  gameInterval = setInterval(updateGame, getIntervalFromSpeed());
  document.addEventListener("keydown", handleKeyPress);

  startTime = Date.now();
}

function setTitle() {
    document.title = "js-jogo-cobra";
}

function drawCanvas() {
    canvas = document.getElementById("snakeGame");
    ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = color;
    ctx.fillRect(5, 5, width - 10, height - 10);
}

function snakeInit() {
    return [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
}

function drawSnake() {
    var corpoSize = 10;

    snake.forEach(corpo => {
        ctx.fillStyle = "white";
        ctx.fillRect(corpo.x * corpoSize, corpo.y * corpoSize, corpoSize, corpoSize)
    });
}

function drawApple() {
    var corpoSize = 10;

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * corpoSize, apple.y * corpoSize, corpoSize, corpoSize);
}

function moveSnake() {
    var head = { x: snake[0].x, y: snake[0].y };
    if (direction === "up") {
        head.y--;
    } else if (direction === "down") {
        head.y++;
    } else if (direction === "left") {
        head.x--;
    } else if (direction === "right") {
        head.x++;
    }

    if (checkCollision(head)) {
        clearInterval(gameInterval);
        alert("Game Over");
        return;
    }

    snake.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        generateNewApplePosition();
    } else {
        snake.pop();
    }
}

function checkCollision(head) {
    if (
        head.x < 0 ||
        head.x >= width / 10 ||
        head.y < 0 ||
        head.y >= height / 10
    ) {
        return true;
    }

    for (var i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function handleKeyPress(event) {
    if (event.keyCode === 38 && direction !== "down") {
        direction = "up";
    } else if (event.keyCode === 40 && direction !== "up") {
        direction = "down";
    } else if (event.keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (event.keyCode === 39 && direction !== "left") {
        direction = "right";
    }
}

function generateNewApplePosition() {
  var corpoSize = 10;
  var maxPositionX = Math.floor((width - 10) / corpoSize);
  var maxPositionY = Math.floor((height - 10) / corpoSize);
  apple.x = Math.floor(Math.random() * maxPositionX);
  apple.y = Math.floor(Math.random() * maxPositionY);
  score++;
}

function updateGame() {
  moveSnake();
  drawCanvas();
  drawSnake();
  drawApple();
  updateScore();
  updateTime();
}

function getIntervalFromSpeed() {
    var speed = speedSlider.value;
    return 600 - (speed * 50);
}

function handleSpeedChange() {
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, getIntervalFromSpeed());
}

function updateScore() {
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = score.toString();
}

function updateTime() {
  var timeElement = document.getElementById("time");
  var currentTime = Math.floor((Date.now() - startTime) / 1000);
  timeElement.textContent = currentTime.toString() + " segundos";
}
