var gameUI = {
	frame: new Image(),
	barWidth: 27,
	barX: 63,
	barMax: 60,
	barHeight: 300,
	barOffset: 6,
	draw: drawUI
};

function drawBar(fillColor, outlineColor, varCurr, varMax, x, y, width, height, reverse) {
	gameScreen.canvas.strokeStyle = fillColor;
	gameScreen.canvas.strokeRect(x,y,width,height);


	gameScreen.canvas.fillStyle = outlineColor;
	if (reverse)
		gameScreen.canvas.fillRect(x, y, varCurr / varMax * width, height);
	else
		gameScreen.canvas.fillRect(x + ((1 - varCurr / varMax) * width), y, (varCurr / varMax) * width, height);
}


function drawUI(){
	// hp bar
	drawBar("black", "#ADFF2F", player1.stats.HP, player1.stats.maxHP, 250, 10, 250, 20, true);
	drawBar("black", "#ADFF2F", player2.stats.HP, player2.stats.maxHP, 250 + 350, 10, 250, 20, false);

	// omega bar
	gameScreen.canvas.fillStyle = "#66FFFF";
	gameScreen.canvas.fillRect(200,30,200,15);
	gameScreen.canvas.fillRect(200 + 500,30,200,15);

	// omega outline
	gameScreen.canvas.strokeStyle = "black";
	gameScreen.canvas.strokeRect(200,30,200,15);
	gameScreen.canvas.strokeRect(200 + 500,30,200,15);

	//character portraits
	gameScreen.canvas.fillStyle = "#FF4500";
	gameScreen.canvas.fillRect(150 + 50,10,50,50);
	gameScreen.canvas.fillRect(150 + 710 -10,10,50,50);

	//time
	gameScreen.canvas.fillStyle = "black";
	gameScreen.canvas.font = "40px Lucida Console";
	gameScreen.canvas.fillText("60", gameScreen.centerX-25, 40);

}