// INITIALIZED VARIABLES

var player1, player2;

// UTILITY DECLARATIONS

var game_loop = null;
var keys = {};

// FUNCTION DEFINITIONS

function main() {
	document.onkeydown = keydown;
	document.onkeyup = keyup;

	initialize();

	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 10);
}

function initialize() {
	// initialize keypress array
	initkeys();
	
	// initialize the frame
	gameUI.frame.src = "img/frame.png";
	
	
	// create players
	player1 = new player(gameScreen.centerX/2, gameScreen.centerY, 1, gamePrefs.player1);
	player2 = new player(3 * gameScreen.centerX/2, gameScreen.centerY, 2, gamePrefs.player2);
}

function paint() {
	gameScreen.draw();
	gameUI.draw();

	// players move
	player1.move();
	player2.move();

	// players shoot/get hit/whatever
	playerUpdate(player1, player2);
	playerUpdate(player2, player1);

	// draw the players
	playerDraw(player1, gameScreen.canvas);
	playerDraw(player2, gameScreen.canvas);
}


// UTILITY FUNCTIONS

function initkeys() {
	for (var i = 1; i <= 90; i++)
		keys[i] = false;
}

function keydown(e) {
	keys[e.which] = true;
}

function keyup(e) {
	keys[e.which] = false;
}

function drawBounds(point) {
	return point.x > gameScreen.width + gameScreen.offset || point.x < gameScreen.offset || 
		   point.y > gameScreen.height || point.y < 0;
}

// EXECUTED CODE
//main();