// character profiles
function setCharacter(player, charName) {
	switch(charName) {
		case 'hikari':
			player.shot1 = hikari_shot1;
			player.shot2 = hikari_shot2;
			player.shot3 = hikari_shot3;
			break;
		case 'cerise':
			player.shot1 = cerise_shot1;
			player.shot2 = cerise_shot2_omega;
			player.shot3 = default_shot;
			break;
		default:
			player.shot1 = default_shot;
			player.shot2 = default_shot;
			player.shot3 = default_shot;
	}
}

// characters
function hikari_shot1() {
	if (this.cooldown.shot1 > 0)
		return;
	else {
		// this.cooldown.id |= 8;
		this.cooldown.shot1 = 50;
	}

	for (var i = 0; i < 10; i++) {
		var mainshot = new bullet(defaultSpecs(this));

		mainshot.facing = this.facing - 45 * Math.PI / 180 + 90 * Math.random() * Math.PI / 180;
		mainshot.speed = 15;
		mainshot.size = 2;
		mainshot.time = 5;

		this.bullets.push(mainshot);
	}
}

function hikari_shot2() {
	if (this.cooldown.shot2 > 0)
		return;
	else {
		// this.cooldown.id |= 4;
		this.cooldown.shot2 = 30;
	}
 	
	var mainshot = new bullet(defaultSpecs(this));

	// main bullet code
	mainshot.speed = 3;
	mainshot.size = 7.5;

	this.bullets.push(mainshot);

	for (var i = 0; i < 5; i++) {
		var sideshot1 = new bullet(defaultSpecs(this));
		sideshot1.delay = 4 * i;
		sideshot1.speed = 10 - 2.5*Math.random();
		sideshot1.size = 2.5;
		sideshot1.facing += 2 * Math.PI / 3;

		sideshot1.update = function() {
			if (this.delay > 0) {
				this.delay--;
				return;
			}

			if (this.facing - mainshot.facing > (- 30 + 15 * Math.random()) * Math.PI / 180) {
				if (this.rotationVelocity === undefined)
					this.rotationVelocity = 5 * Math.PI / 180;
				if (this.rotationAccel === undefined)
					this.rotationAccel = 2 * Math.PI / 180;

				this.facing -= this.rotationVelocity;
			}

			this.hitbox = {
				pos: Point2D.flatAdd(this.pos, -this.size/2),
				width: this.size,
				height: this.size
			};

			damageEnemy(this, this.enemy);

			if (this.destroyed)
				return;

			this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

			if (drawBounds(this.pos))
				this.destroyed = true;
		}

		this.bullets.push(sideshot1);
	}

	for (var i = 0; i < 5; i++) {
		var sideshot2 = new bullet(defaultSpecs(this));
		sideshot2.speed = 10 - 2.5*Math.random();
		sideshot2.size = 2.5;
		sideshot2.facing -= 2 * Math.PI / 3;
		sideshot2.delay = 4 * i;

		sideshot2.update = function() {
			if (this.delay > 0) {
				this.delay--;
				return;
			}

			if (this.facing - mainshot.facing < (30 - 15 * Math.random()) * Math.PI / 180) {
				if (this.rotationVelocity === undefined)
					this.rotationVelocity = 5 * Math.PI / 180;
				if (this.rotationAccel === undefined)
					this.rotationAccel = 2 * Math.PI / 180;

				this.facing += this.rotationVelocity;
			}

			this.hitbox = {
				pos: Point2D.flatAdd(this.pos, -this.size/2),
				width: this.size,
				height: this.size
			};

			damageEnemy(this, this.enemy);

			if (this.destroyed)
				return;

			this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

			if (drawBounds(this.pos))
				this.destroyed = true;
		}
		this.bullets.push(sideshot2);
	}
}

function hikari_shot3() {
	if (this.cooldown.shot3 > 0)
		return;
	else {
		// this.cooldown.id |= 2;
		this.cooldown.shot3 = 25;
	}

	for (var i = -3; i < 4; i++) {
		var shot = new bullet(defaultSpecs(this));

		shot.facing = this.facing + i * 30 * Math.PI / 180;
		shot.speed = -1;
		shot.size = 2.5;

		shot.timeout = 50;
		shot.timeout_wait = 10;

		shot.enemy = this.enemy;
		shot.update = hikari_shot3_update;

		this.bullets.push(shot);
	}
}

function hikari_shot3_update() {
	// if the bullet is destroyed, stop update
	if (this.destroyed)
		return;

	// update position
	if (this.timeout > 0) {
		this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));
		this.timeout--;
	}
	else if (this.timeout_wait > 0) {
		this.timeout_wait--;
	}
	else if (this.timeout_wait == 0) {
		this.facing = Math.atan2(this.enemy.pos.y - this.pos.y, this.enemy.pos.x - this.pos.x);
		this.speed = 15;
		this.timeout_wait--;
	}
	else {
		this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));
	}

	this.hitbox = {
		pos: Point2D.flatAdd(this.pos, -this.size/2),
		width: this.size,
		height: this.size
	};

	damageEnemy(this, this.enemy);

	// check if bullet is out of bounds
	if (drawBounds(this.pos))
		this.destroyed = true;
}

function cerise_shot1() {
	if (this.cooldown.shot1 > 0) {
		return;
	}
	else
		this.cooldown.shot1 = 20;

	var mainshot = new bullet(defaultSpecs(this));

	// main bullet code
	mainshot.speed = 3.5;
	mainshot.size = 5;

	this.bullets.push(mainshot);

	for (var i = 1; i <= 3; i++) {
		var specs = defaultSpecs(this);

		var rotated = { 
			x: specs.x + 12 * Math.pow(1.6, i) - 30,
			y: specs.y + 4 * i - 0.5
		};

		rotated = Point2D.rotate(mainshot.pos, rotated, this.facing + Math.PI);

		specs.x = rotated.x;
		specs.y = rotated.y;

		var b = new bullet(specs);

		b.speed = 4.2;
		b.size = 3;

		this.bullets.push(b);

		var specs2 = defaultSpecs(this);

		var rotated2 = { 
			x: specs2.x + 12 * Math.pow(1.6, i) - 30,
			y: specs2.y - 4 * i - 0.5
		};

		rotated2 = Point2D.rotate(mainshot.pos, rotated2, this.facing + Math.PI);

		specs2.x = rotated2.x;
		specs2.y = rotated2.y;

		var b = new bullet(specs2);

		b.speed = 4.2;
		b.size = 3;

		this.bullets.push(b);
	}
}

function cerise_shot2() {
	if (this.cooldown.shot2 > 0)
		return;
	else
		this.cooldown.shot2 = 20;

	for (var i = 0; i < 5; i++) {
		var specs = defaultSpecs(this);

		var pos = {
			x: specs.x + Math.cos(i * Math.PI / 8) * 20,
			y: specs.y - Math.sin(i * Math.PI / 8) * 20 - 40
		};

		pos = Point2D.rotate(this.pos, pos, this.facing);
		specs.x = pos.x;
		specs.y = pos.y;

		var shot = new bullet(specs);

		shot.facing += 2 * i * Math.PI / 180;
		shot.speed = 5;
		shot.size = 3;
		shot.delay = 2 * i;

		shot.update = function() {
			if (this.delay > 0) {
				this.delay--;
				return;
			}

			this.facing += 0.5 * Math.PI / 180;

			this.hitbox = {
				pos: Point2D.flatAdd(this.pos, -this.size/2),
				width: this.size,
				height: this.size
			};

			damageEnemy(this, this.enemy);

			if (this.destroyed)
				return;

			this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

			if (drawBounds(this.pos))
				this.destroyed = true;
		};

		specs = defaultSpecs(this);

		var pos = {
			x: specs.x + Math.cos(i * Math.PI / 8) * 20,
			y: specs.y + Math.sin(i * Math.PI / 8) * 20 + 40
		};

		pos = Point2D.rotate(this.pos, pos, this.facing);
		specs.x = pos.x;
		specs.y = pos.y;

		var shot2 = new bullet(specs);

		shot2.facing -= 2 * i * Math.PI / 180;
		shot2.speed = 5;
		shot2.size = 3;
		shot2.delay = 2 * i;

		shot2.update = function() {
			if (this.delay > 0) {
				this.delay--;
				return;
			}

			this.facing -= 0.5 * Math.PI / 180;

			this.hitbox = {
				pos: Point2D.flatAdd(this.pos, -this.size/2),
				width: this.size,
				height: this.size
			};

			damageEnemy(this, this.enemy);

			if (this.destroyed)
				return;

			this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

			if (drawBounds(this.pos))
				this.destroyed = true;
		};

		this.bullets.push(shot, shot2);
	}
}

function cerise_shot2_omega() {
	if (this.cooldown.shot2 > 0)
		return;
	else
		this.cooldown.shot2 = 10;

	for (var t = 0; t < 360; t += 60) {
		this.rotationVelocity = 2 * Math.PI / 180;
		if (this.angle === undefined)
			this.angle = 0;
		else
			this.angle += this.rotationVelocity;
		for (var i = 0; i < 5; i++) {
			var specs = defaultSpecs(this);

			var pos = {
				x: specs.x + Math.cos(i * Math.PI / 8) * 20,
				y: specs.y - Math.sin(i * Math.PI / 8) * 20 - 40
			};

			pos = Point2D.rotate(this.pos, pos, this.facing + t * Math.PI / 180 + this.angle);
			specs.x = pos.x;
			specs.y = pos.y;

			var shot = new bullet(specs);

			shot.facing += 2 * i * Math.PI / 180 + t * Math.PI / 180 + this.angle;
			shot.speed = 5;
			shot.size = 3;
			shot.delay = 2 * i;

			shot.update = function() {
				if (this.delay > 0) {
					this.delay--;
					return;
				}

				this.facing += 0.5 * Math.PI / 180;

				this.hitbox = {
					pos: Point2D.flatAdd(this.pos, -this.size/2),
					width: this.size,
					height: this.size
				};

				damageEnemy(this, this.enemy);

				if (this.destroyed)
					return;

				this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

				if (drawBounds(this.pos))
					this.destroyed = true;
			};

			specs = defaultSpecs(this);

			var pos = {
				x: specs.x + Math.cos(i * Math.PI / 8) * 20,
				y: specs.y + Math.sin(i * Math.PI / 8) * 20 + 40
			};

			pos = Point2D.rotate(this.pos, pos, this.facing + t * Math.PI / 180 + this.angle);
			specs.x = pos.x;
			specs.y = pos.y;

			var shot2 = new bullet(specs);

			shot2.facing -= 2 * i * Math.PI / 180 - t * Math.PI / 180 - this.angle;
			shot2.speed = 5;
			shot2.size = 3;
			shot2.delay = 2 * i;

			shot2.update = function() {
				if (this.delay > 0) {
					this.delay--;
					return;
				}

				this.facing -= 0.5 * Math.PI / 180;

				this.hitbox = {
					pos: Point2D.flatAdd(this.pos, -this.size/2),
					width: this.size,
					height: this.size
				};

				damageEnemy(this, this.enemy);

				if (this.destroyed)
					return;

				this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

				if (drawBounds(this.pos))
					this.destroyed = true;
			};

			this.bullets.push(shot, shot2);
		}
	}

}

function cerise_shot3() {
	
}

function test_shot1() {
	if (this.cooldown.shot1 > 0)
		return;
	else {
		// this.cooldown.id |= 8;
		//this.cooldown.shot1 = 5;
	}

	this.rotationFlag = true;
	this.rotationAccel = 5 * Math.PI / 180;

	if (this.rotationVelocity === undefined)
		this.rotationVelocity = 15 * Math.PI / 180;
	else {
		this.rotationVelocity += ((this.rotationFlag)? 1 : -1) * this.rotationAccel;

		if (this.rotationVelocity >= 100 * Math.PI / 180 && this.rotationFlag) {
			this.rotationFlag = false;
		}
		if (this.rotationVelocity <= -100 * Math.PI / 180 && !this.rotationFlag) {
			this.rotationFlag = true;
		}
	}


	for (var i = 0; i < 360; i+=45) {
		var mainshot = new bullet(defaultSpecs(this));
		var mainshot2 = new bullet(defaultSpecs(this));

		mainshot.facing = i * Math.PI / 180 + this.facing + this.rotationVelocity;
		mainshot2.facing = -i * Math.PI / 180 - this.facing - this.rotationVelocity;

		mainshot.size = 2.5;
		mainshot2.size = 2.5;
		this.bullets.push(mainshot, mainshot2);
	}
}

function default_shot() {
	this.bullets.push(new bullet(defaultSpecs(this)));
}