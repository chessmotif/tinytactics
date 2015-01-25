// VARIABLE DECLARATIONS

// UI VARIABLES
var gameUI = {
	frame: new Image(),
	barWidth: 27,
	barX: 63,
	barMax: 60,
	barHeight: 300,
	barOffset: 6
};
gameUI.frame.src = "img/frame.png";



// CANVAS VARIABLES

var gameScreen = {
	canvas: document.getElementById("cv").getContext("2d"),
	canvasWidth: document.getElementById("cv").width,
	offset: (document.getElementById("cv").width - 800) / 2,
	width: 800,
	height: document.getElementById("cv").height,
	centerX: document.getElementById("cv").width / 2,
	centerY: document.getElementById("cv").height / 2,
	radius: document.getElementById("cv").height / 2 - 10
};

// INITIALIZED VARIABLES

var player1, player2;

// UTILITY DECLARATIONS

var game_loop = null;
var keys = {};

// FUNCTION DEFINITIONS

function initialize() {
	// initialize keypress array
	initkeys();

	// create players
	player1 = new player(gameScreen.centerX/2, gameScreen.centerY, 1, 'hikari');
	player2 = new player(3 * gameScreen.centerX/2, gameScreen.centerY, 2, 'cerise');
}

function main() {
	document.onkeydown = keydown;
	document.onkeyup = keyup;

	initialize();

	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 10);
}

function drawScreen() {
	gameScreen.canvas.fillStyle = "#FFFFFF";
	gameScreen.canvas.fillRect(0, 0, gameScreen.canvasWidth, gameScreen.height);
	gameScreen.canvas.fillStyle = "#FFFFFF";
	gameScreen.canvas.fillRect(gameScreen.offset, 0, gameScreen.width, gameScreen.height);
	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(gameScreen.offset, 0, gameScreen.width, gameScreen.height);

	// center point
	gameScreen.canvas.beginPath();
	gameScreen.canvas.arc(gameScreen.centerX, gameScreen.centerY, 1, 0, 2*Math.PI);
	gameScreen.canvas.stroke();
	
	// circle arena
	gameScreen.canvas.beginPath();
	gameScreen.canvas.arc(gameScreen.centerX, gameScreen.centerY, gameScreen.radius, 0, 2*Math.PI);
	gameScreen.canvas.stroke();
}

function drawUI1(){
	gameScreen.canvas.fillStyle = "#ADFF2F";
	gameScreen.canvas.fillRect(250,10,250,20);
	gameScreen.canvas.fillRect(250 + 350,10,250,20);

	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(250 + 350,10,250,20);
	gameScreen.canvas.strokeRect(250,10,250,20);

	gameScreen.canvas.fillStyle = "#66FFFF";
	gameScreen.canvas.fillRect(200,30,200,15);
	gameScreen.canvas.fillRect(200 + 500,30,200,15);

	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(200,30,200,15);
	gameScreen.canvas.strokeRect(200 + 500,30,200,15);

	gameScreen.canvas.fillStyle = "#FF4500";
	gameScreen.canvas.fillRect(150 + 10,10,100,100);
	gameScreen.canvas.fillRect(150 + 700 -10,10,100,100);

	gameScreen.canvas.fillStyle = "black";
	gameScreen.canvas.font = "40px Lucida Console";
	gameScreen.canvas.fillText("60", gameScreen.centerX-25, 40);

}
/*
function drawUI(){
	// HP bar
	gameScreen.canvas.fillStyle = "#DC143C";
	gameScreen.canvas.fillRect(gameUI.barX, gameUI.barMax, gameUI.barWidth, gameUI.barHeight);
	gameScreen.canvas.fillRect(gameUI.barX + gameScreen.offset + gameScreen.width, gameUI.barMax, gameUI.barWidth, gameUI.barHeight);
	
	// Power bar
	gameScreen.canvas.fillStyle = "#FFFF00";
	gameScreen.canvas.fillRect(gameUI.barX - gameUI.barWidth - gameUI.barOffset, gameUI.barMax + gameUI.barOffset, gameUI.barWidth, gameUI.barHeight);
	gameScreen.canvas.fillRect(gameUI.barX - gameUI.barWidth - gameUI.barOffset + gameScreen.offset + gameScreen.width, gameUI.barMax + gameUI.barOffset, gameUI.barWidth, gameUI.barHeight);
	
	// Shield bar
	gameScreen.canvas.fillStyle = "#00FFFF";
	gameScreen.canvas.fillRect(gameUI.barX + gameUI.barWidth + gameUI.barOffset, gameUI.barMax + gameUI.barOffset, gameUI.barWidth, gameUI.barHeight);
	gameScreen.canvas.fillRect(gameUI.barX + gameUI.barWidth + gameUI.barOffset + gameScreen.offset + gameScreen.width, gameUI.barMax + gameUI.barOffset, gameUI.barWidth, gameUI.barHeight);

	// Metallic frame UI
	gameScreen.canvas.drawImage(gameUI.frame, 0, 0, gameScreen.offset, gameScreen.height);
	gameScreen.canvas.drawImage(gameUI.frame, gameScreen.offset + gameScreen.width, 0, gameScreen.offset, gameScreen.height);
}
*/
function paint() {
	drawScreen();
	drawUI1();

	player1.sprite.idleSprite.update();
	player2.sprite.idleSprite.update();

	// player sprite
	player1.sprite.idleSprite.draw(gameScreen.canvas, player1.drawPos.x, player1.drawPos.y);
	player2.sprite.idleSprite.draw(gameScreen.canvas, player2.drawPos.x, player2.drawPos.y);



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

function slerp(p0, p1, t, theta) {
	var point = {
		x: (Math.sin((1-t)*theta)*p0.x + Math.sin(t*theta)*p1.x)/Math.sin(theta),
		y: (Math.sin((1-t)*theta)*p0.y + Math.sin(t*theta)*p1.y)/Math.sin(theta)
	};

	return point;
}

function drawBounds(point) {
	return point.x > gameScreen.width + gameScreen.offset || point.x < gameScreen.offset || 
		   point.y > gameScreen.height || point.y < 0;
}

// EXECUTED CODE
main();