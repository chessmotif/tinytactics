// INSTANTIATE BULLET

var INF_TIME = 1000; // bullet should only be destroyed when hitting another player or hitting the bounds

// specs contain pointer to player, x, y, facing
function bullet(specs, type) {
	this.parent = specs.player;
	this.x = specs.x;
	this.y = specs.y;
	this.facing = specs.facing;

	this.destroyed = false;

	// default bullet specs
	this.size = 5;
	this.speed = 10;
	this.time = INF_TIME;

	// default functions
	this.draw = draw;
	this.update = simpleUpdate;
	this.onDestroy = simpleDestroy;


	// non-defaults, override as necessary
	if (typeof type != "undefined") {
		switch(type.split(" ")[0]) {
			case "timed":
				var param = parseInt(type.split(" ")[1]);
				this.time = isNaN(param)? 15 : param;
				break;

			case "ring":
				this.ring_radius = 60;
				this.onDestroy = ring_onDestroy;
				this.destroyed = true;

				this.parent.wait = 50;
				break;
			case "ringlet":
				this.size = 5;
				this.speed = 2.5;
				this.time = 250;
				this.update = ringlet_update;
				break;

			case "shellring":
				this.shellring_radius = 60;
				this.onDestroy = shellring_onDestroy;
				this.destroyed = true;

				this.parent.wait = 50;
				break;
			case "shellringlet":
				this.size = 3;
				this.speed = 5;
				this.facing = this.shellring_theta;
				this.shellring_rotSpeed = 1 * Math.PI / 180;
				this.time = this.shellring_baseTime = 250;

				this.update = shellringlet_update;
				break;

			case "return": 
				this.size = 3;
				this.speed = 10;

				var param = parseInt(type.split(" ")[1]);
				this.update = return_update;

				this.return_baseSpeed = this.speed;
				var dist = isNaN(param)? 750 : param;
				this.time = this.return_baseTime = dist / this.return_baseSpeed;

				this.return_theta = 0;

				this.parent.wait = 20;
				break;
			case "subreturn":
				this.size = 2;

				this.update = subreturn_update;

				break;

			case "shrapnel":
				this.time = 15;
				this.parent.wait = 20;

				var param = parseInt(type.split(" ")[1]);
				this.shrapnel_Angle = isNaN(param)? 360 : param;

				this.onDestroy = shrapnel_onDestroy;
				break;
			case "subshrapnel":
				this.size = 2.5;
				this.speed = 5 + 5 * Math.random();

				var dist = 75; // time = dist / speed
				this.time = dist / this.speed;
				break;
		}
	}
	else {
		// default bullet cooldown
		this.parent.wait = 20;
	}

}

function draw(specs) {
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

	// if the bullet is destroyed, meh
	if (this.destroyed)
		return;

	// update position
	this.x += this.speed * Math.cos(this.facing);
	this.y += this.speed * Math.sin(this.facing);

	// check if bullet is out of bounds
	if (drawBounds(this))
		this.destroyed = true;
}

function simpleDestroy() {
}