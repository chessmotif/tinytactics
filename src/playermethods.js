function playerMove() {

	if (this.inputs.dash) {
		this.pos.x += this.stats.dashSpeed * this.inputs.horizontal;
		this.pos.y += this.stats.dashSpeed * this.inputs.vertical;
	}
	else {
		this.pos.x += this.stats.moveSpeed * this.inputs.horizontal;
		this.pos.y += this.stats.moveSpeed * this.inputs.vertical;
	}

	this.correctPosition();

	this.centerX = this.pos.x + this.width/2;
	this.centerY = this.pos.y + this.height/2;
}

function playerShoot() {
	if (this.inputs.shot1)
		this.shot1();
	if (this.inputs.shot2)
		this.shot2();
	if (this.inputs.shot3)
		this.shot3();
}

function updateBullets() {
	for (var i = 0; i < this.bullets.length; i++) {
		if (this.bullets[i].destroyed) {
			this.bullets[i].onDestroy();
			this.bullets.splice(i, 1);
		}
	}

	for (var i = 0; i < this.bullets.length; i++)
		this.bullets[i].update();
}

function playerInput() {
	switch (this.stats.playerID) {
		case 1:
			if (keys[p1.up]) this.inputs.vertical = -1;
			else if (keys[p1.down]) this.inputs.vertical = 1;
			else this.inputs.vertical = 0;

			if (keys[p1.right]) this.inputs.horizontal = 1;
			else if (keys[p1.left]) this.inputs.horizontal = -1;
			else this.inputs.horizontal = 0;

			this.inputs.dash = keys[p1.dash];
			this.inputs.shot1 = keys[p1.shot1];
			this.inputs.shot2 = keys[p1.shot2];
			// this.inputs.shot3 = keys[p1.shot3];
			break;
		case 2:
			if (keys[p2.up]) this.inputs.vertical = -1;
			else if (keys[p2.down]) this.inputs.vertical = +1;
			else this.inputs.vertical = 0;

			if (keys[p2.right]) this.inputs.horizontal = 1;
			else if (keys[p2.left]) this.inputs.horizontal = -1;
			else this.inputs.horizontal = 0;

			this.inputs.dash = keys[p2.dash];
			// this.inputs.shot1 = keys[p2.shot1];
			// this.inputs.shot2 = keys[p2.shot2];
			// this.inputs.shot3 = keys[p2.shot3];
	}
}

// non-method functions
function playerDraw(player, context) {
	// draw player
	context.fillStyle = (player.stats.playerID == 1)? "blue" : "red";
	context.fillRect(player.pos.x, player.pos.y, player.width, player.height);
	context.strokeStyle = "black";
	context.lineWidth = "1";
	context.strokeRect(player.pos.x, player.pos.y, player.width, player.height);

	// draw bullets
	for (i = 0; i < player.bullets.length; i++) {
		var toDraw = {
			x: player.bullets[i].x,
			y: player.bullets[i].y,
			size: player.bullets[i].size,
			color: (player.stats.playerID == 1)? 'green' : 'purple'
			// dose kek
		};

		if (!player.bullets[i].destroyed) {
			player.bullets[i].draw(toDraw);
		}
	}
}

function playerUpdate(player, enemy) {
	player.takeInput();

	player.enemy = enemy;
	player.target = {
		x: enemy.pos.x,
		y: enemy.pos.y
	};

	player.facing = Math.atan2(enemy.pos.y - player.pos.y, enemy.pos.x - player.pos.x);

	player.updateBullets();

	if (player.wait > 0)
		player.wait--;
	else player.shoot();
}
