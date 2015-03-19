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

var bgmain = new Image();
	bgmain.src = "img/mainMenu.png";
var bgchar = new Image();
	bgchar.src = "img/charSel.png";
var sbtn = new Image();
	sbtn.src = "img/sbtn.png";	
var rbtn = new Image();
	rbtn.src = "img/rbtn.png";
var lbtn = new Image();
	lbtn.src = "img/lbtn.png";
var bbtn = new Image();
	bbtn.src = "img/bbtn.png";
var cbtn = new Image();
	cbtn.src = "img/cbtn.png";

function drawScreen() {
	var bg = new Image();
	bg.src = "img/bg2.png";

	

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