
//get our drawwable canvas
var canvasEl = document.getElementById('canvas');
var context = canvasEl.getContext('2d');

//set some globals
var height = canvasEl.height;
var width = canvasEl.width;

var gridSize = [40,30]; //x and y

//shapes defined in a 2d array
//bat
var batShape = [
    [1],
    [1],
    [1],
    [1]
];

//bal
var balShape = [
    [1]
];


function drawRectangle(xPos,yPos,xWidth, yWidth, color = "#FFFFFF") {
    context.fillStyle = color;
    context.fillRect(xPos, yPos, xWidth, yWidth);
}

drawRectangle(0,0,width,height);

drawRectangle(30,30,100,100, "#FF0000");

