
//config
{
    //get our drawwable canvas
    var canvasEl = document.getElementById('canvas');
    var context = canvasEl.getContext('2d');

    //set some globals
    var height = canvasEl.height;
    var width = canvasEl.width;

    //x and y
    var gridSizeX = 41;
    var gridSizeY = 31;
    var backgroundColor = "#000000";
}

//game variables
{
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
}

//render functions
{
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
}



//gameloop
{
    var deltaTime = 0;
    var lastTime = performance.now();
    var now = performance.now();

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
        var roundedBallPositionX = Math.round(ballPositionX);
        var roundedBallPositionY = Math.round(ballPositionY);

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

        //@TODO: move player 1 down

        //@TODO: move player 2 up an down

        //call the drawGame functions so that we actually draw the game after all variable changes inside the gameloop are done
        drawGame();

        //request an animation from the browser to start the next update loop
        window.requestAnimationFrame(update);
    }

    //start the game loop by requesting an animation frame from the browser
    window.requestAnimationFrame(update);
}


//input handling
{
    //listen for player 1 input
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

    //player 2 input
    //@TODO: listen for player 2 input
}

