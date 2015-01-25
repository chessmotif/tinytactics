// character profiles
function setCharacter(player, charName) {
	switch(charName) {
		case 'hikari':
			player.shot1 = hikari_shot1;
			player.shot2 = hikari_shot2;
			break;
		default:
			player.shot1 = default_shot;
	}
}

// characters
function hikari_shot1() {
	if (this.cooldown.shot1 > 0)
		return;
	else {
		this.cooldown.id |= 8;
		this.cooldown.shot1 = 30;
	}
 	
	var mainshot = new bullet(defaultSpecs(this));


	// main bullet code
	mainshot.speed = 3;
	mainshot.size = 7.5;

	this.bullets.push(mainshot);

	for (var i = 0; i < 5; i++) {
		var sideshot1 = new bullet(defaultSpecs(this));
		sideshot1.speed = 10 - 2.5*Math.random();
		sideshot1.size = 2.5;
		sideshot1.facing += 2 * Math.PI / 3;

		sideshot1.update = function() {
			if (this.facing - mainshot.facing > (- 30 + 15 * Math.random()) * Math.PI / 180) {
				if (this.rotationVelocity === undefined)
					this.rotationVelocity = 5 * Math.PI / 180;
				if (this.rotationAccel === undefined)
					this.rotationAccel = 2 * Math.PI / 180;

				this.facing -= this.rotationVelocity;
			}

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

		sideshot2.update = function() {
			if (this.facing - mainshot.facing < (30 - 15 * Math.random()) * Math.PI / 180) {
				if (this.rotationVelocity === undefined)
					this.rotationVelocity = 5 * Math.PI / 180;
				if (this.rotationAccel === undefined)
					this.rotationAccel = 2 * Math.PI / 180;

				this.facing += this.rotationVelocity;
			}

			if (this.destroyed)
				return;

			this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

			if (drawBounds(this.pos))
				this.destroyed = true;
		}
		this.bullets.push(sideshot2);
	}
}

function hikari_shot2() {
	if (this.cooldown.shot2 > 0)
		return;
	else {
		this.cooldown.id |= 4;
		this.cooldown.shot2 = 50;
	}

	var shot1 = new bullet(defaultSpecs(this));

	shot1.speed = 5;
	shot1.size = 20;
	shot1.facing = this.facing - Math.PI/2;
	shot1.enemy = this.enemy;

	shot1.update = function() {

		if (this.size <= 1 || this.speed <= 0)
			this.destroyed = true;

		if (this.destroyed)
			return;

		var angle = Math.atan2(this.pos.y - this.enemy.pos.y, this.pos.x - this.enemy.pos.x);
		var dist = - Math.abs(angle - this.facing);

		if (dist >= 5 * Math.PI / 180 || dist < - 5 * Math.PI / 180)
			this.facing += 5 * Math.PI / 180;
 
		this.pos = Point2D.plus(this.pos, Point2D.toXY(this.speed, this.facing));

		if (drawBounds(this.pos))
			this.destroyed = true;
	}

	this.bullets.push(shot1);
}

function default_shot() {
	this.bullets.push(new bullet(defaultSpecs(this)));
}