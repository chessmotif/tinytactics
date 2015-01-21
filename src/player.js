// INSTANTIATE PLAYER

function player(xpos, ypos, no, name) {
	// variables
	this.stats = {
		playerID: no,
		HP: 10000,
		heat: 0,
		power: 0,
		moveSpeed: 2,
		dashSpeed: 7.5
	};

	this.pos = {
		x: xpos,
		y: ypos
	};

	this.width = 15;
	this.height = 20;

	this.drawPos = {
		x: this.pos.x - this.width / 2,
		y: this.pos.y - this.height / 2
	};

	this.bullets = [];
	this.facing = 0;

	this.state = 'idle';
	this.wait = 0;

	// add this in, yana
	this.sprite = 0;

	// inputs

	this.inputs = {
		vertical: 0,
		horizontal: 0,
		dash: false,
		shot1: false,
		shot2: false,
		shot3: false
	};

	// methods
	this.updateBullets = updateBullets;
	this.move = playerMove;
	this.shoot = playerShoot;
	this.takeInput = playerInput;
	this.correctPosition = correctPosition;
	this.updateDrawPos = updateDrawPos;

	setCharacter(this, name);
}