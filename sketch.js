let ball_x, ball_y, ball_dx, ball_dy, ball_diameter;
let paddle_x, paddle_y, paddle_dx, paddle_dy, paddle_length, paddle_width;
let brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft;
let brickX, brickY, bricks_visible;
let rightPressed, leftPressed;
let bricks = [];
let score = 0;
let life = 3;


function setup() {
  createCanvas(400, 400);
  background("black");
  fill("white");
  // fill(0, 102, 153, 51);

  // circle(x,y,radius)
  ball_x = width / 2;
  ball_y = height / 2;
  ball_dx = 3;
  ball_dy = -2;
  ball_diameter = 30;

  //paddle
  paddle_length = 90;
  paddle_width = 20;
  paddle_x = width / 2 - (paddle_length / 2);
  paddle_y = height - paddle_width;

  //brick
  brickWidth = 60;
  brickHeight = 20;
  brickPadding = 15;
  brickOffsetTop = 50;
  brickOffsetLeft = 57.5;
  bricks_visible = true;

  rightPressed = false;
  leftPressed = false;

  for (let i = 0; i < 4; i++) {
    bricks[i] = [];
    for (let j = 0; j < 4; j++) {
      bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
  }


}



function draw() {

  background("black")

  circle(ball_x, ball_y, ball_diameter);

  textSize(15);
  text(`Score: ${score}`, 20, 30);

  textSize(15);
  text(`Life: ${life}`, 330, 30);

  ball_x += ball_dx;
  ball_y += ball_dy;

  if (ball_x + ball_dx > width - ball_diameter / 2 || ball_x + ball_dx < ball_diameter / 2) {
    ball_dx = -ball_dx;
  }

  if (ball_y + ball_dy < ball_diameter / 2) {
    ball_dy = -ball_dy;
  } 
  else if (ball_y + ball_dy > height - ball_diameter / 2) {
    if (life > 0) {
      life--;
      ball_x = width / 2;
      ball_y = height / 2;

    } else {
      alert(`GAME OVER! YOUR SCORE IS ${score}`);
      ball_x = width / 2;
      ball_y = height / 2;
      ball_dx = 0;
      ball_dy = 0;
    }
  }

  ball_x += ball_dx;
  ball_y += ball_dy;

  rect(paddle_x, paddle_y, paddle_length, paddle_width);

  //Changing the location not smooth
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x > 0) {
      paddle_x = paddle_x - 5;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + (paddle_length) < width) {
      paddle_x = paddle_x + 5;
    }
  }

  //Ball hits the paddle and bounces back
  if (
    ball_x - ball_diameter / 2 >= paddle_x &&
    ball_x + ball_diameter / 2 <= paddle_x + paddle_length &&
    ball_y + ball_diameter / 2 >= paddle_y
  ) {
    ball_dy = -ball_dy;
  }


//Building Bricks
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (bricks[i][j].status == 1) {
        brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
        brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        rect(brickX, brickY, brickWidth, brickHeight);
        fill(bricks_visible ? 'white' : 'transparent');
      }
    }
  }
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let brick = bricks[i][j];
      if (brick.status == 1) {
        if (ball_x > brick.x && ball_x < brick.x + brickWidth && ball_y > brick.y && ball_y < brick.y + brickHeight) {
          ball_dy = -ball_dy;
          score++;
          brick.status = 0;
          if (score == 4 * 4) {
            alert(`CONGRATULATIONS! YOU WON THE GAME WITH ${life} REMAINING`);
            ball_x = width / 2;
            ball_y = height / 2;
            ball_dx = 0;
            ball_dy = 0;
          }
        }
      }
    }
  }



}