const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

var circle = {
    x: CANVAS_WIDTH/2,
    y: CANVAS_HEIGHT/2,
    diameter: 30,
    xSpeed: 0, 
    ySpeed: 0
};

var paddle = {
    
};

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    circle.xSpeed = random(-3, 3);
    circle.ySpeed = random(-3, 3);
}

function draw() {
    
    background(0);
    
    drawBall();
    bounceBall();
    moveBall();

}
function drawBall() {
    stroke('black');
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
}

function moveBall() {
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
}

function bounceBall() {
    if (circle.x < (0 + circle.diameter/2) || 
            circle.x > (CANVAS_WIDTH - circle.diameter/2)) {
        circle.xSpeed = -circle.xSpeed;
    }
    
    if (circle.y < (0 + circle.diameter/2) || 
            circle.y > (CANVAS_HEIGHT - circle.diameter/2)) {
        circle.ySpeed = -circle.ySpeed;
    }
}