/* Name: Pong
   Author: Robin Goyal
   Last Modified: May 11, 2017
   Purpose: Pong game from scratch to learn about p5.js
   Usage: Open the html file or sketch.js file.
          Use W and S to move left paddle, UP and DOWN arrow keys to move right
*/

// Canvas parameters
var canvas;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Score variables;
var userScore = 0;
var opponentScore = 0;

// Object parameters for ball
var circle = {
    x: CANVAS_WIDTH/2,
    y: CANVAS_HEIGHT/2,
    diameter: 20,
    xSpeed: 0, 
    ySpeed: 0
};

// User Paddle object parameters
var user_paddle = {
    x: 10,
    y: CANVAS_HEIGHT/2,
    width: 10, 
    height: 50,
    ySpeed: 3
};

// Opponent Paddle object parameters
var opponent_paddle = {
    x: CANVAS_WIDTH - 10,
    y: CANVAS_HEIGHT/2,
    width: 10, 
    height: 50,
    ySpeed: 3
}

// Setup canvas and ball speed
function setup() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(250, 150);
    // Randomly choose ball speeds
    circle.xSpeed = random(-4, 4);
    circle.ySpeed = random(-2, 2);
}

// Draw function
function draw() {
    // Create white background
    background(0);
    
    // Call functions
    drawScore();
    drawPaddles();
    moveUserPaddle();
    moveOpponentPaddle();
    showBall();
    bounceBall();
    console.log("Ball: " + (circle.y + circle.diameter/2) + "\nPaddle: " + user_paddle.y);
}

// Draw score text at center top of canvas
function drawScore() {
    textSize(24);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    fill(255);
    text(userScore + "  " + opponentScore, CANVAS_WIDTH/2, 5);
}

function moveOpponentPaddle() {
    // Increases paddle movement based off paddle speed
    if (keyIsDown(UP_ARROW)) {
        opponent_paddle.y -= opponent_paddle.ySpeed;
    }
    
    else if (keyIsDown(DOWN_ARROW)) {
        opponent_paddle.y += opponent_paddle.ySpeed;
    }
    
    // Check if opponent is trying to push paddle beyond canvas bounds
    if ((opponent_paddle.y) > (CANVAS_HEIGHT - opponent_paddle.height/2)) {
        opponent_paddle.y = CANVAS_HEIGHT - opponent_paddle.height/2;
    }
    else if (opponent_paddle.y < opponent_paddle.height/2) {
        opponent_paddle.y = opponent_paddle.height/2;
    }
}

function moveUserPaddle() {
    // Increases paddle movement based off paddle speed
    if (keyIsDown(83)) {
        user_paddle.y += user_paddle.ySpeed;
    }

    else if (keyIsDown(87)) {
        user_paddle.y -= user_paddle.ySpeed;
    }   
    
    // Check if user is trying to push paddle beyond canvas bounds
    if ((user_paddle.y) > (CANVAS_HEIGHT - user_paddle.height/2)) {
        user_paddle.y = CANVAS_HEIGHT - user_paddle.height/2;
    }
    else if (user_paddle.y < user_paddle.height/2) {
        user_paddle.y = user_paddle.height/2;
    }
}

// COMPLETED
function drawPaddles() {
    fill(255);
    rectMode(CENTER);
    
    // User paddle
    rect(user_paddle.x, user_paddle.y, user_paddle.width, user_paddle.height);
    // Opponent paddle
    rect(opponent_paddle.x, opponent_paddle.y, 
         opponent_paddle.width, opponent_paddle.height);
}

// COMPLETED
function showBall() {
    // Draw ball
    fill(255);
    stroke('black');
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
    
    // Update ball location
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
    
}

function bounceBall() {
    
    // Check if ball location was past paddles in horizontal direction
    userPaddleCheck = circle.x < (user_paddle.x + user_paddle.width/2 + circle.diameter/2);
    oppPaddleCheck = circle.x > (opponent_paddle.x - opponent_paddle.width/2 - circle.diameter/2);
    
    // Nested conditional to check if ball hit user paddle, otherwise point score
    if (userPaddleCheck) { 
        if (hitUserPaddle()) {
            circle.xSpeed = -circle.xSpeed;
        }
        else {
            pointScore();
        }
    }
    
    // Next condition to check if ball hit opponent paddle
    if (oppPaddleCheck) {
        if (hitOpponentPaddle()) {
            circle.xSpeed = -circle.xSpeed;
        }
        else {
            pointScore();
        }
    }

    // Check if ball hit top or bottom wall
    if (circle.y < (0 + circle.diameter/2) || 
            circle.y > (CANVAS_HEIGHT - circle.diameter/2)) {
        circle.ySpeed = -circle.ySpeed;
    }   
}

function hitUserPaddle() {
    // Check if ball is within user paddle location range
    userTopBound = (circle.y - circle.diameter/2) < (user_paddle.y + user_paddle.height/2);
    userBotBound = (circle.y + circle.diameter/2) > (user_paddle.y - user_paddle.height/2);
    
    // If ball hit user paddle return, otherwise increase opponent score
    if (userTopBound && userBotBound) {
        return true;
    }
    else {
        opponentScore += 1;
    }
}

function hitOpponentPaddle() {
    // Check if ball is within opponent paddle location range
    oppTopBound = (circle.y - circle.diameter/2) < (opponent_paddle.y + opponent_paddle.height/2);
    oppBotBound = (circle.y + circle.diameter/2) > (opponent_paddle.y - opponent_paddle.height/2);
    
    // If ball hit opponent paddle return, otherwise increase opponent score
    if (oppTopBound && oppBotBound) {
        return true;
    }
    else {
        userScore += 1;
    }
}

// Reset ball position and speed and call draw again
function pointScore() {
    circle.x = CANVAS_WIDTH/2;
    circle.y = CANVAS_HEIGHT/2;
    circle.xSpeed = random(-4, 4);
    circle.ySpeed = random(-2, 2);

    redraw();
}