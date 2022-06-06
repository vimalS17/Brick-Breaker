let ball_x, ball_y, ball_dx, ball_dy, ball_diameter, paddle_height, paddle_width, paddle_x, paddle_y, block_x, block_y, block_width, block_height;
let brickRowCount,brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft;
let brickX, brickY, bricks_visible;
let isTouched = false;


let rightPressed, leftPressed;



let bricks = [];
let score = 0;
let life = 3;
// let interval=setInterval(draw,10);

function setup() {
  createCanvas(400, 400);
  background("black");
  fill("white");
  ball_x = width/2;
  ball_y = height/2;
  ball_diameter = 30;
  ball_dx = 7;
  ball_dy = -5;
  paddle_height = 20;
  paddle_width = 90;
  paddle_x = width/2 - paddle_width/2;
  paddle_y = height - paddle_height;
  brickRowCount = 5;
  brickColumnCount = 6;
  brickWidth = 50;
  brickHeight = 15;
  brickPadding = 10;
  brickOffsetTop = 50;
  brickOffsetLeft = 25;
  bricks_visible=true;

  rightPressed = false;
  leftPressed = false;
  
  for(let i=0; i<brickColumnCount; i++) {
bricks[i] = [];
for(let j=0; j<brickRowCount; j++) {
bricks[i][j] = { x: 0, y: 0, status: 1 };
}
}

}

function draw() {
  background("black");
  circle(ball_x, ball_y, 30);
  rect(paddle_x, paddle_y, paddle_width, paddle_height)
  ball_x += ball_dx;
  ball_y += ball_dy;
  
  textSize(30);
  text(`Score:${score}`, 30, 40)
  
  
  textSize(30);
  text(`lives :${life}`, 280, 40)
  
  if(ball_x > width - ball_diameter/2 || ball_x < 0 + ball_diameter/2){
    ball_dx = -ball_dx;
  }
  
  if( ball_y < 0 + ball_diameter/2){
    ball_dy = -ball_dy;
  }
  if(ball_y > height -ball_diameter/2 ){
    // ball_x = width/2;
    // ball_y = height - ball_diameter/2;
    ball_dx = 0;
    ball_dy = 0;
    life-=life;
    if(life>0){
      refereshAll();
    }
    // isTouched = true;
    // if(isTouched) life--;
  }
  if(ball_y + paddle_height + ball_diameter/2 >= height && (ball_x >= paddle_x && ball_x <= paddle_x + paddle_width)){
    ball_dy = -ball_dy;
    // ball_dx = -ball_dx;
  }
  if (keyIsDown(LEFT_ARROW)) {
    if(paddle_x > 0){
   paddle_x = paddle_x - 4;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if(paddle_x < width - paddle_width){
    paddle_x = paddle_x + 4;
    }
  }
  
      // build bricks
    for(let i=0; i<brickColumnCount; i++) {
    for(let j=0; j<brickRowCount; j++) {
    if(bricks[i][j].status == 1){
    brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
    brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
    bricks[i][j].x = brickX;
    bricks[i][j].y = brickY;
    // canvas.beginPath();
    rect(brickX, brickY, brickWidth, brickHeight);
    fill(bricks_visible? 'white' : 'transparent');
    // canvas.closePath();
    }
    }
    }
  
      for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
    let b = bricks[i][j];
    if (b.status == 1) {
    if (ball_x > b.x && ball_x < b.x + brickWidth && ball_y > b.y && ball_y < b.y + brickHeight) {
    ball_dy = -ball_dy;
    b.status = 0;
    score++;
    if(score == brickRowCount*brickColumnCount) {
    alert("YOU WIN, CONGRATULATIONS!");
    }
    }
    }
    }
  }
  
}
