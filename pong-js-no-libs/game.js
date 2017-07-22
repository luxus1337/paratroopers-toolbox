
/**
 *  CONFIG
 */
//get our drawwable canvas
const canvasEl = document.getElementById('canvas');
const context = canvasEl.getContext('2d');

//set some globals
const height = canvasEl.height;
const width = canvasEl.width;

//x and y
const gridSizeX = 41;
const gridSizeY = 31;
const backgroundColor = "#000000";



/*HALLO DIT IS EVRN EEN TESTER*/

/**
 * /CONFIG
 */

/**
 * GAME VARIABLES
 */

//speed is in units per second, a unit is a square on the playfield
var ballSpeedX = -3;
var ballSpeedY = .25;
var ballSizeX = 1;
var ballSizeY = 1;
var ballColor = "#FFFFFF";
var ballPositionX = Math.round(gridSizeX * .5);
var ballPositionY = Math.round(gridSizeY * .5);

var batSpeedY = 1;
var batSizeX = 1;
var batSizeY = 5;
var batColor = "#FFFFFF";
var bat1PositionX = 3;
var bat1PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
var bat1movingUp = false
var bat1movingDown = false;

var bat2PositionX = gridSizeX - 3;
var bat2PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);

/**
 * /GAME VARIABLES
 */

/**
 * RENDER FUNCTIONS
 */

/**
 * Draw a rectangle at given positon and given size with given color
 * @param {number} xPos 
 * @param {number} yPos 
 * @param {number} xWidth 
 * @param {number} yWidth 
 * @param {string} color example and default: "#FFFFFF"
 */
function drawRectangle(xPos, yPos, width, height, color = "#FFFFFF") {
    context.fillStyle = color;
    context.fillRect(Math.round(xPos), Math.round(yPos), width, height);
}

function drawGame() {
    //draw the background
    drawRectangle(0,0,width,height, backgroundColor);

    //draw player 1
    drawRectangle(bat1PositionX, bat1PositionY, batSizeX, batSizeY, batColor);

    //draw player 2
    drawRectangle(bat2PositionX, bat2PositionY, batSizeX, batSizeY, batColor);

    //draw ball
    drawRectangle(ballPositionX, ballPositionY, ballSizeX, ballSizeY, ballColor);
}

/**
 * /RENDER FUNCTIONS
 */


/**
 * GAMELOOP
 */
var deltaTime = 0;
var lastTime = performance.now();
var now = performance.now();

//update is called every frame
function update() {
    //calculate the time difference with last frame
    now = performance.now();
    deltaTime = (now - lastTime) * .001;
    lastTime = now;

    //move ball
    ballPositionX = ballPositionX + ballSpeedX * deltaTime;
    ballPositionY = ballPositionY + ballSpeedY * deltaTime;

    var roundedBallPositionX = Math.round(ballPositionX);
    var roundedBallPositionY = Math.round(ballPositionY);

    //check for ball colission with player 1
    if(roundedBallPositionX === bat1PositionX) { //check horizontaly with player 1
        if(
            roundedBallPositionY >= bat1PositionY &&
            roundedBallPositionY < bat1PositionY + batSizeY
        ) {
            //ball collided with player what do?
            ballSpeedX = ballSpeedX * -1;
        }
    }

    //@TODO: check for ball colission with player 2
    //@TODO: check for boundary colission


    //@TODO: listen for player 1 input
    //move player 1 up
    if(bat1movingUp) {
        bat1PositionY = bat1PositionY - batSpeedY * deltaTime;
    } else if (bat1movingDown) {
       bat1PositionY = bat1PositionY + batSpeedY * deltaTime; 
    }
    //@TODO move player 1 down
    //@TODO: listen for player 2 input
    //@TODO: move player 2

    drawGame();
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
/**
 * /GAMELOOP
 */

/**
 * INPUT
 */
document.addEventListener('keydown', function(e){
    switch(e.key) {
        case "w":
            bat1movingUp = true;
            break;
        case "s":
            bat1movingDown = true;
            break;
    }
});

document.addEventListener('keyup', function(e){
    switch(e.key) {
        case "w":
            bat1movingUp = false;
            break;
        case "s":
            bat1movingDown = false;
            break;
    }
});
/**
 * /INPUT
 */

