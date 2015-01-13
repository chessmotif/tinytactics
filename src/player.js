// INSTANTIATE PLAYER

function player(xpos, ypos, no) {
	// variables
	this.stats = {
		playerID: no,
		HP: 10000,
		heat: 0,
		power: 0
	};

	this.pos = {
		x: xpos,
		y: ypos
	};

	this.width = 15;
	this.height = 20;

	this.centerX = this.pos.x + this.width / 2;
	this.centerY = this.pos.y + this.height / 2;

	this.bullets = [];

	this.state = 0;
	this.wait = 0;

	// add this in, yana
	this.sprite = 0;

	// keypresses

	this.keypress = {
		vertical: 0,
		horizontal: 0,
		dash: false,
		attack: false
	};

	// methods
	this.updateBullets = updateBullets;
	this.move = playerMove;
	//this.shoot = shootPlayer;
	this.takeInput = playerInput;


	this.correctPosition = function() {
		if (this.pos.x + this.width > gameScreen.width + gameScreen.offset)
			this.pos.x = gameScreen.width - this.width + gameScreen.offset;
		else if (this.pos.x < gameScreen.offset)
			this.pos.x = gameScreen.offset;

		if (this.pos.y + this.height > gameScreen.height)
			this.pos.y = gameScreen.height - this.height;
		else if (this.pos.y < 0)
			thi.pos.y = 0;

	};
}