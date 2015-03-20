var controltoggle = false;
var controlImg = new Image();
controlImg.src = "img/controls.png";

function drawBG(){
	gameScreen.canvas.drawImage(bgmain, gameScreen.offset, 0, 800, 600);
	showControls();
}

function drawcharSel(){
	gameScreen.canvas.drawImage(bgchar, gameScreen.offset, 0, 800, 600);
}

var options = new Array();

function addOption(x,y,w,h,Img,varName){
	var op = new button(x,y,w,h,Img,varName);
	
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

function button(x,y,w,h,bgImg,varName){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.bgImg = varName;
	this.bgImgHover = new Image();
	this.bgImgHover.src = "img/" + bgImg + "-h.png";

	this.draw = function(){
		gameScreen.canvas.drawImage(this.bgImg, this.x, this.y, this.w, this.h);
	}

	this.drawHover = function(){
		gameScreen.canvas.drawImage(this.bgImgHover, this.x, this.y, this.w, this.h);
	}
}



function showControls(){
	if(controltoggle){
		gameScreen.canvas.drawImage(controlImg, gameScreen.offset + 380, 20, 420, 600);
	}
}

// INIT THINGS FOR MAIN
function initMain(){
	controltoggle = false;
	options = [];
	drawBG();
	
	addOption(gameScreen.offset,250,309,30,"sbtn", sbtn);
	addOption(gameScreen.offset,300, 217,34,"cbtn", cbtn);
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
			if(controltoggle)
				controltoggle = false;
			else
				controltoggle = true;
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



