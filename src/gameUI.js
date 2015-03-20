var gameUI = {
	frame: new Image(),
	barWidth: 27,
	barX: 63,
	barMax: 60,
	barHeight: 300,
	barOffset: 6,
	draw: drawUI
};

var UIColors = {
	hpBar: "#ADFF2F",
	omegaBar: "#66FFFF",

	outline: "black",

	timeText: "black",
	heatText: "#DD0000"
};

var hikaribubble = new Image();
hikaribubble.src = "img/port-hikari.png";
var cerisebubble = new Image();
cerisebubble.src = "img/port-cerise.png";
var rynnbubble = new Image();
rynnbubble.src = "img/port-rynn.png";

function drawHPBar(varCurr, varMax, x, y, width, height, reverse) {
	gameScreen.canvas.strokeStyle = UIColors.outline;
	gameScreen.canvas.strokeRect(x, y, width, height);

	gameScreen.canvas.fillStyle = UIColors.hpBar;

	if (!reverse)
		gameScreen.canvas.fillRect(x, y, varCurr / varMax * width, height);
	else
		gameScreen.canvas.fillRect(x + ((1 - varCurr / varMax) * width), y, (varCurr / varMax) * width, height);
}

function drawHeatText(heatLevel, font, x, y) {
	gameScreen.canvas.fillStyle = UIColors.heatText;
	gameScreen.canvas.font = font;
	gameScreen.canvas.fillText("Heat: " + heatLevel + "%", x, y);
}

function drawTimeText(text, font, x, y) {
	gameScreen.canvas.fillStyle = UIColors.timeText;
	gameScreen.canvas.font = font;
	gameScreen.canvas.fillText(text, x, y);
}

function drawBubble(){
	switch(player1.name){
		case "hikari":
			gameScreen.canvas.drawImage(hikaribubble,180,0,80,80);
		break;
		case "rynn":
			gameScreen.canvas.drawImage(rynnbubble,180,0,80,80);
		break;
		case "cerise":
			gameScreen.canvas.drawImage(cerisebubble,180,0,80,80);
		break;
	}
	switch(player2.name){
		case "hikari":
			gameScreen.canvas.drawImage(hikaribubble,830,0,80,80);
		break;
		case "rynn":
			gameScreen.canvas.drawImage(rynnbubble,830,0,80,80);
		break;
		case "cerise":
			gameScreen.canvas.drawImage(cerisebubble,830,0,80,80);
		break;
	}
}

function drawUI(){
	// hp bar
	drawHPBar(player1.stats.HP, player1.stats.maxHP, 250, 10, 250, 20, false);
	drawHPBar(player2.stats.HP, player2.stats.maxHP, 250 + 350, 10, 250, 20, true);

	// omega bar
	gameScreen.canvas.fillStyle = "#66FFFF";
	gameScreen.canvas.fillRect(200,30,200,15);
	gameScreen.canvas.fillRect(200 + 500,30,200,15);

	// omega outline
	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(200,30,200,15);
	gameScreen.canvas.strokeRect(200 + 500,30,200,15);

	

	//character bubble
	drawBubble();

	// time
	drawTimeText("60", "40px Lucida Console", gameScreen.centerX-25, 40);

	// heat
	drawHeatText(player1.stats.heat, "20px Lucida Console", 265, 65);
	drawHeatText(player2.stats.heat, "20px Lucida Console", 730, 65);
}