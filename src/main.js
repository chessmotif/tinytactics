function drawBG(){
	gameScreen.canvas.drawImage(bgmain, gameScreen.offset, 0, 800, 600);
}

function drawcharSel(){
	gameScreen.canvas.drawImage(bgchar, gameScreen.offset, 0, 800, 600);
}

var options = new Array();

function addOption(y,w,h,Img){
	var op = new button(y,w,h,Img);
	
	options.push(op);
}

function inCoordinates(b, mousePos){
	if(mousePos.x >= b.x && mousePos.x <= b.x + b.w && mousePos.y >= b.y-10 && mousePos.y <= b.y + b.h)
		return true;
	else 
		return false;
}
	
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function drawMenu(undraw){
	var i;
	for(i=0; i<options.length; i++){
		if(i != undraw)
			options[i].draw();
	}
}

function button(y,w,h,bgImg){
	this.x=gameScreen.offset;
	this.y=y;
	this.w=w;
	this.h=h;
	this.bgImg = new Image();
	this.bgImg.src = "img/" + bgImg + ".png";
	this.bgImgHover = new Image();
	this.bgImgHover.src = "img/" + bgImg + "-h.png";

	this.draw = function(){
		gameScreen.canvas.drawImage(this.bgImg, this.x, this.y, this.w, this.h);
	}

	this.drawHover = function(){
		gameScreen.canvas.drawImage(this.bgImgHover, this.x, this.y, this.w, this.h);
	}
}

// INIT THINGS FOR MAIN
function initMain(){
	drawBG();
	
	addOption(250,309,30,"sbtn");
	addOption(300, 217,34,"cbtn");
	drawMenu();
	gameScreen.CNAVAS.addEventListener('mousemove', hoverEvent, false);
	gameScreen.CNAVAS.addEventListener('mousedown', clickEvent, false);
}

function clickEvent(evt) {
        var mousePos = getMousePos(gameScreen.CNAVAS, evt);
		if(inCoordinates(options[0],mousePos)){
			charSelection();
			removeListeners();
		}
		else if(inCoordinates(options[1],mousePos)){
			removeListeners();
		}
}

function hoverEvent(evt) {
	var mousePos = getMousePos(gameScreen.CNAVAS, evt);
	var s = false;
	for(i=0; i<options.length; i++){
		if(inCoordinates(options[i],mousePos)){
			drawBG();
			options[i].drawHover();
			drawMenu(i);
			s = true;
		}
	}
	if(!s){
	drawBG();
	drawMenu();
	}
	
}

function removeListeners(){
	gameScreen.CNAVAS.removeEventListener('mousemove', hoverEvent);
	gameScreen.CNAVAS.removeEventListener('mousedown', clickEvent);
}

function charSelection(){
	drawcharSel();
	main();
}
//