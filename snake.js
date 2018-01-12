const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// create the unit (cada quadradinho)
const box = 16;


// create Snake
let snake = [];
snake[0] = {
  x: 18 * box,
  y: 20 * box
}

// create food
let food = {
  x: Math.floor(Math.random() * 38) * box,
  y: Math.floor(Math.random() * 38) * box
}

// create score
let score = 0;


// control the snake
let d;
document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode === 37 && d !== 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode === 38 && d !== 'DOWN') {
    d = 'UP';
  } else if (event.keyCode === 39 && d !== 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode === 40 && d !== 'UP') {
    d = 'DOWN';
  }
}

// if snake hits himself
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the Canvas
function draw() {

  // background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  // draw snake body
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // draw food
  ctx.fillStyle = 'yellow';
  ctx.fillRect(food.x, food.y, box, box);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // direction snake goes
  if (d === 'LEFT') {
    snakeX -= box;
  } else if (d === 'UP') {
    snakeY -= box;
  } else if (d === 'RIGHT') {
    snakeX += box;
  } else if (d === 'DOWN') {
    snakeY += box;
  }

  // if snake eats food
  if (snakeX === food.x && snakeY === food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 38) * box,
      y: Math.floor(Math.random() * 38) * box
    }

  } else {
    // remove the tail (last part of snake)
    snake.pop();
  }


  // add new head (depois de remover atrás 'pop()', adiciona um 'box' na frente)
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // game over rules
  if (snakeX < 0 || snakeX > box * 37 || snakeY < 0 || snakeY > box * 37 || collision(newHead, snake)) {
    clearInterval(game);
    location.reload();
  }

  snake.unshift(newHead);

  // draw score
  ctx.fillStyle = 'white';
  ctx.font = '45px Arial';
  ctx.fillText(score, 4 * box, 3.2 * box);



}

// call draw function every 100 milliseconds
let game = setInterval(draw, 1000/15);
