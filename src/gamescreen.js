var gameScreen = {
	canvas: document.getElementById("cv").getContext("2d"),
	canvasWidth: document.getElementById("cv").width,
	offset: (document.getElementById("cv").width - 800) / 2,
	width: 800,
	height: document.getElementById("cv").height,
	centerX: document.getElementById("cv").width / 2,
	centerY: document.getElementById("cv").height / 2,
	radius: document.getElementById("cv").height / 2 - 10,
	draw: drawScreen
};

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