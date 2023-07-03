var canvas;
var ctx;

var width = 800;
var height = 600;
var color = "black";
var direction = "right"
var apple;

window.onload = function() {
    setTitle();
    drawCanvas();
    var snakeObj = snakeInit();
    genNewApple();
    drawSnake(snakeObj);
    updateGame(snakeObj);

    var gameInterval = setInterval(function() {
        updateGame(snakeObj);
    }, 200);
    document.addEventListener("keydown", handleKeyPress);
}

function setTitle() {
    document.title = "js-jogo-cobra";
}

function drawCanvas() {
    canvas = document.getElementById("snakeGame");
    ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;
    var x = 50, y = 50;
    var color = "black";

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function snakeInit() {

    var snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ];

    return snake;
}

function drawSnake(snake) {
    var corpoSize = 10;
    ctx.clearRect(0, 0, width, height);
    drawCanvas();

    snake.forEach(corpo => {
        ctx.fillStyle = "white";
        ctx.fillRect(corpo.x * corpoSize, corpo.y * corpoSize, corpoSize, corpoSize)
    });
}

function drawApple(apple) {
    //var rx = Math.floor(Math.random() * 600), ry = Math.floor(Math.random() * 600);

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * 10, apple.y * 10, 10, 10)
}

function moveSnake(snake) {
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

      if (head.x === apple.x && head.y === apple.y) {
        console.log("Teste")
      }

      snake.unshift(head);
      snake.pop();
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

function genNewApple() {
    var maxX = Math.floor(width / 10);
    var maxY = Math.floor(height / 10);
    if (apple) {
        apple.x = Math.floor(Math.random() * maxX);
        apple.y = Math.floor(Math.random() * maxY);
    } else {
        apple = {x: Math.floor(Math.random() * maxX),
                 y: Math.floor(Math.random() * maxY)
                }
    }

}

function updateGame(snakeObj) { 
    moveSnake(snakeObj, apple);
    drawSnake(snakeObj);
    drawApple(apple)
}