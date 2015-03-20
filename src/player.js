// INSTANTIATE PLAYER

function player(xpos, ypos, no, name) {
	// variables
	this.stats = {
		playerID: no,
		maxHP: 1000,
		HP: 1000,
		heat: 0,
		power: 0,
		moveSpeed: 2,
		dashSpeed: 1
	};

	this.pos = {
		x: xpos,
		y: ypos
	};

	this.width = 40;
	this.height = 50;

	this.drawPos = {
		x: this.pos.x - this.width / 2,
		y: this.pos.y - this.height / 2
	};

	this.hitbox = {
		pos: this.drawPos,
		width: this.width,
		height: this.height
	};

	this.bullets = [];
	this.facing = 0;
	this.dashTimer = 0;
	this.dashDirection = 0;

	this.state = 'Idle';
	this.wait = 0;

	// inputs

	this.inputs = {
		vertical: 0,
		horizontal: 0,
		dash: false,
		shot1: false,
		shot2: false,
		shot3: false
	};

	this.cooldown = {
		id: 0,
		shot1: 0,
		shot2: 0,
		shot3: 0,
		dash: 0
	};

	// methods
	this.updateBullets = updateBullets;
	this.move = playerMove;
	this.shoot = playerShoot;
	this.takeInput = playerInput;
	this.correctPosition = correctPosition;
	this.updateDrawPos = updateDrawPos;
	this.updateCooldowns = updateCooldowns;

	setCharacter(this, name);

	// add this in, yana
	
	this.name = name;
	this.sprite = new spriteSheet(this);
}