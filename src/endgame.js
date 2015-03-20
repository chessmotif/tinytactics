
function removeListenersEnd(){
	gameScreen.CNAVAS.removeEventListener('mousemove', hoverEventEnd);
	gameScreen.CNAVAS.removeEventListener('mousedown', clickEventEnd);
}

function clickEventEnd(evt) {
        var mousePos = getMousePos(gameScreen.CNAVAS, evt);
		if(inCoordinates(options[0],mousePos)){
			rematch();
			
		}
		else if(inCoordinates(options[1],mousePos)){
			returnToMain();
			
		}
}

function returnToMain(){
	removeListenersEnd();
	initMain();
}

function rematch(){
	removeListenersEnd();
	main();
}


function hoverEventEnd(evt) {
	var mousePos = getMousePos(gameScreen.CNAVAS, evt);
	var s = false;
	for(i=0; i<options.length; i++){
		if(inCoordinates(options[i],mousePos)){
			drawWin(winner.stats.playerID, winner.name)
			options[i].drawHover();
			drawMenu(i);
			s = true;
		}
	}
	if(!s){
	drawWin(winner.stats.playerID, winner.name)
	drawMenu();
	}
	
}




function drawWin(player, loli){


	var wintext;
	var chi;
	if(player == 1){
		wintext = p1win;
	}
	else{
		wintext = p2win;
	}
	if(loli == "hikari"){
		chi = chibHikari;
	}
	else if(loli == "cerise"){
		chi = chibCerise;
	}
	else{
		chi = chibRynn;
	}

	


	gameScreen.canvas.drawImage(winbg, gameScreen.offset + 150, 150, 590, 268);
	gameScreen.canvas.drawImage(chi, gameScreen.offset + 130, 100, 300, 414);
	gameScreen.canvas.drawImage(wintext, gameScreen.offset + 445, 250, 237, 31);
}



function endGame(){

	options = [];
	addOption(gameScreen.offset + 545,310,169,35,"rebtn",rebtn);
	addOption(gameScreen.offset + 445,350,271,35,"mebtn",mebtn);
	
	drawWin(winner.stats.playerID, winner.name);
	drawMenu();

	gameScreen.CNAVAS.addEventListener('mousemove', hoverEventEnd, false);
	gameScreen.CNAVAS.addEventListener('mousedown', clickEventEnd, false);
}