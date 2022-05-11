// creating a variable to get myCanvas id from canvas tag in HTML
const canv = document.getElementById('myCanvas');

// getContext returns a drawing context on the canvas, rendering in '2d'
const render = canv.getContext('2d');

// adds background img
const backImg = new Image();
backImg.src = './img/pink-purple-gradient.jpg';



// creating variables for starting location of ball, also connection to x, y variables to ball arc
let x = canv.width/2;
let y = canv.height-80;

// creating variables for movement for ball
let mx = 3
let my = -3

// creating a variable for ball radius
let ballRadius = 6;

// creating variable for paddle paddleX starting locations for paddle
const paddleHeight = 20;
const paddleWidth = 100;
let paddleX = (canv.width-paddleWidth)/2;
const paddleMarginBottom = 50;

// variable for score
let score = 0;

// variable for lives
let lives = 3;

// sound variable
const fxBrick = new Audio('./SFX/Dull-Bubble.mp3');
const fxPaddle = new Audio('./SFX/Dull-Bubble.mp3');
const fxWall = new Audio('./SFX/Dull-Bubble.mp3');
const fxWin = new Audio('./SFX/crowd-cheer.mp3');
const fxLose = new Audio('./SFX/sad-trombone.mp3')

// creating variables for left and right key presses, is false because key are not pressed in the beginning
let rightKey = false;
let leftKey = false;

// variables for bricks
let brickRow = 3;
let brickColumn = 6;
const brickWidth = 50;
const brickHeight = 10;
const brickPadding = 10;
let brickOffsetTop = 50;
let brickOffsetLeft = 30;


// creates a new empty array, '[]', in bricks at position column and row
let bricks = [];
for (let column = 0; column < brickColumn; column++) {
    bricks[column] = [];
    for (let row = 0; row < brickRow; row++) {
        bricks[column][row] = {x:0, y:0, status: 1};
    }
}

// adding event listeners for key presses
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);

// adding event listeners for mouse movement
// document.addEventListener('mousemove', mouseMoveHandler, false);

// clientX returns horizontal coordinate of the mouse pointer
/* function mouseMoveHandler(e) {
    let mouseX = e.clientX - canv.offsetLeft;
    if(mouseX > 0 && mouseX < canv.width) {
        paddleX = mouseX - paddleWidth/2;
    }
}
*/

// function for collision detection on bricks
function collisionHit() {
    for(let column = 0; column < brickColumn; column++) {
        for(let row = 0; row < brickRow; row++) {
            let b = bricks[column][row];
            if(b.status == 1) {
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                my = -my;
                fxBrick.play();
                b.status = 0;
                score++;
                if (score === brickRow * brickColumn) {
                    alert('YOU WIN!!!');
                    document.location.reload();
                    fxWin.play();
                    
                    }
                }
            }
        }
    }
}

// create function to draw circle
function drawBall() {
    render.beginPath();
    render.arc(x, y, ballRadius, 0, Math.PI*2);
    render.fillStyle = 'red';
    render.fill();
    render.strokeStyle = 'black';
    render.stroke();
    render.closePath();
}

// drawing the paddle
function drawPaddle() {
    render.beginPath();
    render.rect(paddleX, canv.height-paddleHeight-paddleMarginBottom, paddleWidth, paddleHeight);
    render.fillStyle = 'black';
    render.fill();
    render.strokeStyle = 'yellow';
    render.stroke();
    render.closePath;
    
}

// function for drawing bricks, loops through all the bricks in the array
function drawBricks() {
    // loops for creating bricks
    for (let column = 0; column < brickColumn; column++) {
        for (let row = 0; row < brickRow; row++)
            // checks status to see if brick should be created
            if(bricks[column][row].status == 1) {
            // brickX sets row location, brickY sets column location
            let brickX = (column*(brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (row*(brickHeight + brickPadding)) + brickOffsetTop;
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            render.beginPath();
            render.rect(brickX, brickY, brickWidth, brickHeight);
            render.fillStyle = 'yellow';
            render.fill();
            render.strokeStyle = 'black';
            render.stroke();
            render.closePath();
        }
    }
}


function draw() {
    render.drawImage(backImg, 0, 0)
    drawBricks();
    drawBall();
    drawPaddle();
    collisionHit();
    drawScore();
    
    // hit detection on walls
    if (y + my < ballRadius) {
        my = -my;
        fxWall.play();
    } 
    if ( x + mx > canv.width-ballRadius || x + mx < ballRadius) {
        mx = -mx;
        fxWall.play();
    }
    // hit detection for paddle
    else if(y + my > canv.height-ballRadius-paddleMarginBottom) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            my = -my;
            fxPaddle.play();
        }
        // created game over scenario
        if(y + ballRadius > canv.height) {
            lives--;
            if(!lives) {
                fxLose.play();
                alert('GAME OVER!');
                document.location.reload();
            }
            else {
                x = canv.width/2;
                y = canv.height-80;
                mx = 3 * (Math.random() * 2 - 1);
                my = -3;
                paddleX = (canv.width-paddleWidth)/2;
            }
        }
    }
    
    // paddle speed and keeping paddle within width
    if (rightKey) {
        paddleX += 7;
        if (paddleX + paddleWidth > canv.width) {
            paddleX = canv.width - paddleWidth;
        }
    }
    else if(leftKey) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    // added variables to move circle
    x += mx;
    y += my;
    requestAnimationFrame(draw);
}

// creating functions for key down and key up
function keyDown(k) {
    if (k.key == 'Right' || k.key == 'ArrowRight') {
        rightKey = true;
    }
    else if (k.key == 'Left' || k.key == 'ArrowLeft') {
        leftKey = true;
    }
}

function keyUp(k) {
    if (k.key == 'Right' || k.key == 'ArrowRight') {
        rightKey = false;
    }
    else if(k.key = 'Left' || k.key == 'ArrowLeft') {
        leftKey = false;
    }
}
// draw score function
function drawScore() {
    drawLives();
    render.font = '25px Monaco';
    render.fillStyle = 'yellow';
    render.fillText('Score: ' + score, 8, 20);
}

// function for lives
function drawLives() {
    render.font = '25px Monaco';
    render.fillStyle = 'yellow';
    render.fillText('Lives: ' + lives, canv.width-85, 20);
}



draw();






