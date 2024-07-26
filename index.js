const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let interval = 0;

let start_x = canvas.width / 2;
let start_y = canvas.height - 30;
let max_ball_angle = 170;
let min_ball_angle = 10;
const radius = 10;

let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brick_collumns = 5;
const brick_rows = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickPadding = 10;

const bricks = Array.from({length: brick_rows}, () => Array(brick_collumns).fill(0));


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function ball_movement() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_ball()
  draw_bricks()
  draw_paddle()
  move_paddle()
  check_hitted_brick()
  check_ball_limits()
}

function move_paddle() {
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }
}

function draw_ball() {
  ctx.beginPath();
  ctx.arc(start_x, start_y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw_paddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw_bricks() {
  let sum = 0;
  for (let column = 0; column < brick_collumns; column++) {
    for (let row = 0; row < brick_rows; row++) {
      sum += bricks[row][column]
      if (bricks[row][column] == 0) {
        x = brickOffsetLeft + column * (brickWidth + brickPadding);
        y = brickOffsetTop + row * (brickHeight + brickPadding);

        ctx.beginPath()
        ctx.rect(x, y, brickWidth, brickHeight);
        ctx.fillStyle = "#BC4A3C";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
  check_player_won(sum)
}

function check_player_won(sum) {
  if (sum == brick_collumns * brick_rows) {
    alert("YOU WON!!!");
    document.location.reload();
    clearInterval(interval);
  }
}

function check_ball_limits() {
  if (start_x <= canvas.width && start_x >= 0){
    start_x += dx;
  }
  else {
    dx = -dx;
    start_x += dx;
  }
  
  if (start_y == canvas.height - radius * 2 && start_x >= paddleX && start_x <= paddleX + paddleWidth) {
    dy = -dy
  }

  if (start_y > canvas.height - radius * 2) {
    alert("GAME OVER!!!")
    document.location.reload();
    clearInterval(interval);
  }

  if (start_y >= 0){
    start_y += dy;
  }
  else {
    dy = -dy
    start_y += dy
  }
}

function check_hitted_brick() {
  console.log("RIP")
  for (c = 0; c < brick_collumns; c++) {
    for (r = 0; r < brick_rows; r++) {
      x = brickOffsetLeft + c * (brickWidth + brickPadding);
      y = brickOffsetTop + r * (brickHeight + brickPadding);
      if (bricks[r][c] == 0) {
        if (start_y == y + brickHeight && start_x <= x + brickWidth && start_x >= x) {
          dy = -dy
          bricks[r][c] = 1
        }
      }
    }
  }
}

function keyDownHandler(e) {
  if(e.code  == "ArrowRight") {
      rightPressed = true;
  }
  else if(e.code == 'ArrowLeft') {
      leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.code  == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.code == 'ArrowLeft') {
      leftPressed = false;
  }
}

interval = setInterval(ball_movement, 10);
