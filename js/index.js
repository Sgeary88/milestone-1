// creating a variable to get myCanvas id from canvas tag in HTML
const canv = document.getElementById('myCanvas');

// getContext returns a drawing context on the canvas, rendering in '2d'
const render = canv.getContext('2d');

// creating variables for starting location of ball, also connection to x, y variables to ball arc
let x = canv.width/2;
let y = canv.height-30;

// creating variables for movement for ball
let mx = 2
let my = -2

// create function to draw circle
function draw() {
    render.beginPath();
    render.arc(x, y, 10, 0, Math.PI*2);
    render.fillStyle = 'blue';
    render.fill();
    render.closePath();
    x += mx;
    y += my;
}


setInterval(draw, 10);

// drawing circle



// need to create ball
// need to cread bottom paddle
// need to create bricks
// need to create movement for bottom paddle
// need to create action that moves ball
// hit detection
// removing blocks on hit detection







