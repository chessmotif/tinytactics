
function removeListenersChar(){
	gameScreen.CNAVAS.removeEventListener('mousemove', hoverEventChar);
	gameScreen.CNAVAS.removeEventListener('mousedown', clickEventChar);
}

function clickEventChar(evt) {
        var mousePos = getMousePos(gameScreen.CNAVAS, evt);
		if(inCoordinates(options[1],mousePos)){
			player1Curr = nextOption(characterlist,player1Curr);
			
		}
		else if(inCoordinates(options[0],mousePos)){
			player1Curr = prevOption(player1Curr);
			
		}
		else if(inCoordinates(options[3],mousePos)){
			player2Curr = nextOption(characterlist,player2Curr);
		}
		else if(inCoordinates(options[2],mousePos)){
			player2Curr = prevOption(player2Curr);
			
		}
		else if(inCoordinates(options[5],mousePos)){
			arenaCurr = nextOption(arenalist,arenaCurr);
		}
		else if(inCoordinates(options[4],mousePos)){
			arenaCurr = prevOption(arenaCurr);
			
		}
		else if(inCoordinates(options[7],mousePos)){
			gamePrefs.player1 = characterlist[player1Curr];
			gamePrefs.player2 = characterlist[player2Curr];
			gamePrefs.bullet1 = bulletlist[player1Curr];
			gamePrefs.bullet2 = bulletlist[player2Curr];
			gamePrefs.arena = arenalist[arenaCurr];
			removeListenersChar();
			main();
		}
}

function nextOption(arr,label){
	console.log(label + " > " + (arr.length-1));
	var num = label;
	if((arr.length-1) > label){
		num++;
	}
	return num;
}

function prevOption(label){
	console.log(label + " > 0");
	var num = label;
	if(num > 0){
		num--;
	}
	return num;
}

function hoverEventChar(evt) {
	var mousePos = getMousePos(gameScreen.CNAVAS, evt);
	var s = false;
	for(i=0; i<options.length; i++){
		if(inCoordinates(options[i],mousePos)){
			drawcharSel();
			drawChar(characterlist[player1Curr],characterlist[player2Curr],arenalist[arenaCurr]);
			options[i].drawHover();
			drawMenu(i);
			s = true;
		}
	}
	if(!s){
	drawcharSel();
	drawChar(characterlist[player1Curr],characterlist[player2Curr],arenalist[arenaCurr]);
	drawMenu();
	}
	
}



function drawChar(loli1,loli2,are){
	var image = new Image();
	image.src = "img/sel-" + loli1 + ".png";
	var image2 = new Image();
	image2.src = "img/sel-" + loli2 + ".png";

	var chib1 = new Image();
	chib1.src = "img/chib-" + loli1 + ".png";
	var chib2 = new Image();
	chib2.src = "img/chib-" + loli2 + ".png";

	var ar = new Image();
	ar.src = "img/sel-" + are + ".png";

	gameScreen.canvas.drawImage(image, 260, 170, 100, 30);
	gameScreen.canvas.drawImage(image2, 260, 300, 100, 30);
	gameScreen.canvas.drawImage(chib1, 420, 30, 300, 414);
	gameScreen.canvas.drawImage(chib2, 620, 70, 300, 414);
	gameScreen.canvas.drawImage(ar, 245, 400, 150, 80);
}



function charSelection(){
	drawcharSel();
	options = [];
	addOption(200,170,36,44,"lbtn");
	addOption(400,170,36,44,"rbtn");
	addOption(200,300,36,44,"lbtn");
	addOption(400,300,36,44,"rbtn");
	addOption(200,400,36,44,"lbtn");
	addOption(400,400,36,44,"rbtn");
	addOption(400,400,36,44,"rbtn");
	addOption(716,468,234,49, "bbtn");
	drawMenu();
	drawChar(characterlist[player1Curr],characterlist[player2Curr],arenalist[arenaCurr]);

	gameScreen.CNAVAS.addEventListener('mousemove', hoverEventChar, false);
	gameScreen.CNAVAS.addEventListener('mousedown', clickEventChar, false);
	//main();
}