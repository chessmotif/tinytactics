// NAME FORMAT: <bullet_name>_<function_override>
// pseudoparam pass name format: <bullet_name>_<param_name>

function shrapnel_onDestroy() {
	this.destroyed = true;
	for (var theta = 0; theta < this.shrapnel_Angle; theta += this.shrapnel_Angle / 15) {
		var rand = Math.random();

		var newSpecs = {
			player: this.parent,
			x: this.x,
			y: this.y,
			facing: this.facing + (this.shrapnel_Angle/2 - theta) * Math.PI / 180
		};

		var b = new bullet(newSpecs, "subshrapnel");
		this.parent.bullets.push(b);
	}
}

function return_update() {
	this.time--;
	if (this.time >= this.return_baseTime * 2 / 3);
	else if (this.time >= this.return_baseTime * 1 / 3)
		this.speed = 0;
	else if (this.time >= 0)
		this.speed = -this.return_baseSpeed;
	else {
		this.destroyed = true;
		return;
	}
 	
 	/*
	if (this.time < 0) {
		this.destroyed = true;
		return;
	}
	*/

	this.return_theta += 10 * Math.PI / 180;
	for (var theta = 0; theta < 360; theta += 360 / 5) {
		var newSpecs = {
			player: this.parent,
			x: this.x,
			y: this.y,
			facing: this.facing + theta * Math.PI / 180 + this.return_theta
		};

		var b = new bullet(newSpecs, "timed 7");
		b.size = 3;
		this.parent.bullets.push(b);
	}

	// update position
	this.x += this.speed * Math.cos(this.facing);
	this.y += this.speed * Math.sin(this.facing);
}

function ring_onDestroy() {
	var angle = 0;
	for (var theta = angle; theta < angle + Math.PI * 2; theta += 2 * Math.PI / 12) {
		var newSpecs = {
			player: this.parent,
			x: this.parent.centerX + this.ring_radius * Math.cos(theta),
			y: this.parent.centerY + this.ring_radius * Math.sin(theta),
			facing: this.facing
		};

		var b = new bullet(newSpecs, "ringlet");
		b.ringlet_theta = theta + Math.PI/2;
		b.ringlet_centerX = this.x;
		b.ringlet_centerY = this.y;
		b.ringlet_radius = this.ring_radius;
		this.parent.bullets.push(b);
	}
}

function ringlet_update() {
	this.time--;
	if (this.time < 0) {
		this.destroyed = true;
		return;
	}

	this.ringlet_theta += 5 * Math.PI / 180;

	this.ringlet_centerX += this.speed * Math.cos(this.facing);
	this.ringlet_centerY += this.speed * Math.sin(this.facing);

	this.x = this.ringlet_centerX + this.ringlet_radius * Math.cos(this.ringlet_theta);
	this.y = this.ringlet_centerY + this.ringlet_radius * Math.sin(this.ringlet_theta);
}

function shellring_onDestroy() {
	var angle = 0;
	for (var theta = angle, cnt = 0; theta < angle + Math.PI * 2; theta += 2 * Math.PI / 24, cnt++) {
		var newSpecs = {
			player: this.parent,
			x: this.parent.centerX + this.ring_radius * Math.cos(theta),
			y: this.parent.centerY + this.ring_radius * Math.sin(theta),
			facing: this.facing
		};

		var b = new bullet(newSpecs, "shellringlet");
		b.facing = b.shellring_theta = theta + Math.PI/2;
		b.shellring_radius = this.shellring_radius;
		b.shellring_rotation = (cnt % 2 == 0);
		this.parent.bullets.push(b);
	}
}

function shellringlet_update() {
	this.time--;

	if (this.time >= 3 * this.shellring_baseTime / 4) {
		var rot = 2.5 * Math.PI / 180;

		this.shellring_theta += this.shellring_rotation? rot : -rot;
		this.x = this.parent.centerX + this.shellring_radius * Math.cos(this.shellring_theta);
		this.y = this.parent.centerY + this.shellring_radius * Math.sin(this.shellring_theta);
	}
	else if (this.time >= 0) {
		var rot = 2 * Math.PI / 180;
		this.facing += this.shellring_rotation? rot : -rot;

		this.x += this.speed * Math.cos(this.facing);
		this.y += this.speed * Math.sin(this.facing);
	}
	else {
		this.destroyed = true;
		return;
	}

}