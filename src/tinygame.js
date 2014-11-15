// VARIABLE DECLARATIONS

// CANVAS VARIABLES

var gameScreen = {
	canvas: document.getElementById("cv").getContext("2d"),
	width: document.getElementById("cv").width,
	height: document.getElementById("cv").height,
	centerX: document.getElementById("cv").width / 2,
	centerY: document.getElementById("cv").height / 2
};

// INITIALIZED VARIABLES

var player1, player2;

// UTILITY DECLARATIONS

var game_loop = null;
var keys = {};

// FUNCTION DEFINITIONS

function initialize() {
	// create players
	player1 = new player(gameScreen.centerX/2, gameScreen.centerY, 1);
	player2 = new player(3 * gameScreen.centerX/2, gameScreen.centerY, 2);
}

function main() {
	document.onkeydown = keydown;
	document.onkeyup = keyup;

	initialize();

	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 10);
}

function drawScreen() {
	gameScreen.canvas.fillStyle = "white";
	gameScreen.canvas.fillRect(0, 0, gameScreen.width, gameScreen.height);
	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(0, 0, gameScreen.width, gameScreen.height);

	// center point
	gameScreen.canvas.beginPath();
	gameScreen.canvas.arc(gameScreen.centerX, gameScreen.centerY, 1, 0, 2*Math.PI);
	gameScreen.canvas.stroke();
}

function paint() {
	drawScreen();

	// players move
	player1.move();
	player2.move();
	
	// players shoot/get hit/whatever
	player1.update(gameScreen.canvas, player2);
	player2.update(gameScreen.canvas, player1);
}

// UTILITY FUNCTIONS

function keydown(e) {
	keys[e.which] = true;
}

function keyup(e) {
	delete keys[e.which];
}

function slerp(p0, p1, t, theta) {
	var point = {
		x: (Math.sin((1-t)*theta)*p0.x + Math.sin(t*theta)*p1.x)/Math.sin(theta),
		y: (Math.sin((1-t)*theta)*p0.y + Math.sin(t*theta)*p1.y)/Math.sin(theta)
	};

	return point;
}

// EXECUTED CODE

main();