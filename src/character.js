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
	var mainshot = new bullet(defaultSpecs(this));
	var sideshot1 = new bullet(defaultSpecs(this));
	var sideshot2 = new bullet(defaultSpecs(this));


	// main bullet code
	mainshot.speed = 3;
	mainshot.size = 7.5;

	sideshot1.speed = 10;
	sideshot1.size = 2.5;
	sideshot1.facing += 2 * Math.PI / 3;

	sideshot1.update = function() {
		if (this.facing - mainshot.facing > - 30 * Math.PI / 180) {
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

	sideshot2.speed = 10;
	sideshot2.size = 2.5;
	sideshot2.facing -= 2 * Math.PI / 3;

	sideshot2.update = function() {
		if (this.facing - mainshot.facing < 30 * Math.PI / 180) {
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


	this.bullets.push(mainshot, sideshot1, sideshot2);
}

function hikari_shot2() {
	this.bullets.push(new bullet(defaultSpecs(this)));
}

function default_shot() {
	this.bullets.push(new bullet(defaultSpecs(this)));
}