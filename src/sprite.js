

function animatedSprite(player, source, tileWidth, tileHeight, frames) {
	this.player = player;
	this.spriteTile = new Array();
	this.image = new Image();
	this.image.src = source;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.totalFrames = frames;
	this.timer = 0;
	this.tickFrame = 100;
	this.tick = 0;
	
	this.update = function() {
		var dir = (player.facing <= Math.PI / 2 && player.facing >= - Math.PI / 2)? "L" : "R";
		this.image = new Image();
		this.image.src = "img/" + player.name + player.state + dir + ".png";

		this.tick += 5;
		if(this.tick == this.tickFrame) {
			this.timer++;
			this.tick = 0;
		}
		if(this.timer == this.totalFrames)
			this.timer = 0;
	}
	
	this.draw = function(context,x,y) {
		context.drawImage(this.image,this.timer * this.tileWidth,0,this.tileWidth,this.tileHeight, x,y,this.tileWidth,this.tileHeight);

	}

}

function spriteSheet(player){
	this.idleSprite = new animatedSprite(player, "img/" + player.name + "Idle" + "R.png", player.width, player.height, 8);
}