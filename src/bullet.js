var INF_TIME = 1000;

function bullet(specs, type) {
	this.parent = specs.player;

	this.pos = {
		x: specs.x,
		y: specs.y
	};

	this.facing = specs.facing;
	this.enemy = specs.enemy;

	this.destroyed = false;

	// default bullet specs
	this.size = 5;
	this.speed = 10;
	this.time = INF_TIME;

	// default functions
	this.draw = drawBullet;
	this.update = simpleUpdate;
}

function drawBullet(specs) {
	if (drawBounds(this.pos))
		return;

	gameScreen.canvas.fillStyle = specs.color;
	gameScreen.canvas.beginPath();
	gameScreen.canvas.arc(specs.x, specs.y, specs.size, 0, 2*Math.PI);
	gameScreen.canvas.fill();
}

function simpleUpdate() {
	// time update
	if (this.time >= 0)
		this.time--;
	else
		this.destroyed = true;

	// if the bullet is destroyed, stop update
	if (this.destroyed)
		return;

	// update position
	this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

	// check if bullet is out of bounds
	if (drawBounds(this.pos))
		this.destroyed = true;
}

function defaultSpecs(p) {
	var b = {
		player: p,
		x: p.pos.x,
		y: p.pos.y,
		facing: p.facing
	};

	return b;
}