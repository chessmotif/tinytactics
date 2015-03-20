var gameScreen = {
	CNAVAS: document.getElementById("cv"),
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

var gamePrefs = {
	player1: "hikari",
	player2: "cerise",
	bullet1: "",
	bullet2: "",
	arena: "sky"
};




function drawScreen() {
	var bg;

	switch(gamePrefs.arena){
		case "sky": bg = bgSky;
					break;
		case "city": bg = bgCity;
					break;
	}

	

	gameScreen.canvas.fillStyle = "#FFFFFF";
	gameScreen.canvas.fillRect(0, 0, gameScreen.canvasWidth, gameScreen.height);

	gameScreen.canvas.drawImage(bg,gameScreen.offset,0,800,600);
	//gameScreen.canvas.fillStyle = "#FFFFFF";
	//gameScreen.canvas.fillRect(gameScreen.offset, 0, gameScreen.width, gameScreen.height);
	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(gameScreen.offset, 0, gameScreen.width, gameScreen.height);

	// center point
	//gameScreen.canvas.beginPath();
	//gameScreen.canvas.arc(gameScreen.centerX, gameScreen.centerY, 1, 0, 2*Math.PI);
	//gameScreen.canvas.stroke();
	
	// circle arena
	//gameScreen.canvas.beginPath();
	//gameScreen.canvas.arc(gameScreen.centerX, gameScreen.centerY, gameScreen.radius, 0, 2*Math.PI);
	//gameScreen.canvas.stroke();
}