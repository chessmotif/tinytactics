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
	this.damage = 5;

	this.hitbox = {
		pos: Point2D.flatAdd(this.pos, -this.size/2),
		width: this.size,
		height: this.size
	};

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

	this.hitbox = {
		pos: Point2D.flatAdd(this.pos, -this.size/2),
		width: this.size,
		height: this.size
	};

	damageEnemy(this, this.enemy);

	// if the bullet is destroyed, stop update
	if (this.destroyed)
		return;

	// update position
	this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

	// check if bullet is out of bounds
	if (drawBounds(this.pos))
		this.destroyed = true;
}

function hitboxCollisionCheck(h1, h2) {
	return 	h2.pos.x <= h1.pos.x + h1.width &&
			h1.pos.x <= h2.pos.x + h2.width &&
			h2.pos.y <= h1.pos.y + h1.height &&
			h1.pos.y <= h2.pos.y + h2.height;
}

function damageEnemy(bullet, target) {
	if (target.dashTimer > 0 && target.stats.heat <= 150)
		return;

	if (hitboxCollisionCheck(bullet.hitbox, target.hitbox)) {
		if (target.stats.HP > 0)
			target.stats.HP -= bullet.damage * ((target.stats.heat > 100)? target.stats.heat / 100 : 1);
		bullet.destroyed = true;
	}
}

function defaultSpecs(p) {
	var b = {
		player: p,
		x: p.pos.x,
		y: p.pos.y,
		facing: p.facing,
		enemy: p.enemy
	};

	return b;
}