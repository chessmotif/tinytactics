var INF_TIME = 1000;

function bullet(specs, type) {
	this.parent = specs.player;

	this.pos = {
		x: specs.x,
		y: specs.y
	};

	// default functions
	this.draw = drawBullet;
	this.update = simpleUpdate;
}

function drawBullet(specs) {
	if (drawBounds(this))
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
	this.x += this.speed * Math.cos(this.facing);
	this.y += this.speed * Math.sin(this.facing);

	// check if bullet is out of bounds
	if (drawBounds(this))
		this.destroyed = true;
}

function defaultSpecs() {
	var b = {
		player: this,
		x: this.pos.x,
		y: this.pos.y,
		facing: this.facing
	};

	return b;
}