
//config

//get our drawwable canvas
const canvasEl = document.getElementById('game');
const context = canvasEl.getContext('2d');

//set some globals
const height = canvasEl.height;
const width = canvasEl.width;

//x and y
const gridSizeX = 41;
const gridSizeY = 31;
const backgroundColor = "#000000";


//game variables

//speed is in units per second, a unit is a square on the playfield
let ballSpeedX = 5;
let ballSpeedY = 3;
let ballSizeX = 1;
let ballSizeY = 1;
let ballColor = "#FFFFFF";
let ballPositionX = Math.round(gridSizeX * .5);
let ballPositionY = Math.round(gridSizeY * .5);

let batSpeedY = 10;
let batSizeX = 1;
let batSizeY = 5;
let batColor = "#FFFFFF";
let bat1PositionX = 2;
let bat1PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
let bat1movingUp = false;
let bat1movingDown = false;

let bat2PositionX = gridSizeX - 2;
let bat2PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
let bat2movingUp = false;
let bat2movingDown = false;


//render functions

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




//gameloop

let deltaTime = 0;
let lastTime = performance.now();
let now = performance.now();

//update is called every frame
function update() {
	
	//calculate the time difference (deltaTime) with last frame
	now = performance.now();
	deltaTime = (now - lastTime) * .001;
	lastTime = now;
	
	//move ball
	ballPositionX = ballPositionX + ballSpeedX * deltaTime;
	ballPositionY = ballPositionY + ballSpeedY * deltaTime;
	
	//for colission checking we will use a rounded ball position so we can check if a ball is matching an exact round number
	let roundedBallPositionX = Math.round(ballPositionX);
	let roundedBallPositionY = Math.round(ballPositionY);
	
	//check for ball colission with player 1
	if(roundedBallPositionX === bat1PositionX) { //check if the ballposition is the same as the players x position
		if(
			roundedBallPositionY >= bat1PositionY && //the rounded ballPosition is greater or equal to the position of the bat
			roundedBallPositionY < bat1PositionY + batSizeY //the roudned ballPosition is smaller than the batPosition plus its size
			//if both statements are true we are connecting vertically with the bat
		) {
			//ball collided with player so we reverse it's xSpeed so we have a "bounce"
			ballSpeedX = ballSpeedX * -1;
		}
	}
	
	//@TODO: check for ball colission with player 2
	
	//@TODO: check for ball with boundary colission
	
	//move player 1 up
	if(bat1movingUp) {
		bat1PositionY = bat1PositionY - batSpeedY * deltaTime;
	} else if (bat1movingDown) {
		bat1PositionY = bat1PositionY + batSpeedY * deltaTime;
	}

	if(bat2movingUp) {
		bat2PositionY = bat2PositionY - batSpeedY * deltaTime;
	} else if (bat2movingDown) {
		bat2PositionY = bat2PositionY + batSpeedY * deltaTime;
	}

	//@TODO: move player 2 up an down
	
	//call the drawGame functions so that we actually draw the game after all variable changes inside the gameloop are done
	drawGame();
	
	//request an animation from the browser to start the next update loop
	window.requestAnimationFrame(update);
}

//start the game loop by requesting an animation frame from the browser
window.requestAnimationFrame(update);



//input handling

//listen for player 1 input
document.addEventListener('keydown', function(e){
	switch(e.keyCode) {
		case 87:
		bat1movingUp = true;
		break;
		case 83:
		bat1movingDown = true;
		break;
		case 38:
		bat2movingUp = true;
		break;
		case 40:
		bat2movingDown = true;
		break;
	}
});

document.addEventListener('keyup', function(e){
	switch(e.keyCode) {
		case 87:
		bat1movingUp = false;
		break;
		case 83:
		bat1movingDown = false;
		break;
		case 38:
		bat2movingUp = false;
		break;
		case 40:
		bat2movingDown = false;
		break;
	}
});

//player 2 input
//@TODO: listen for player 2 input


