function playerMove() {
	var move = {
		x: this.inputs.horizontal,
		y: this.inputs.vertical
	};

	if (this.inputs.dash) {
		move = Point2D.scale(move, this.stats.dashSpeed);
		this.dashTimer = 15;
		this.dashDirection = move;
	}
	else if (this.dashTimer > 0) {
		move = Point2D.scale(move, this.stats.moveSpeed);
		var dash = Point2D.scale(this.dashDirection, this.stats.dashSpeed);
		move = Point2D.plus(move, dash);
		this.dashTimer--;
	}

	this.pos = Point2D.plus(this.pos, move);

	this.correctPosition();
	this.updateDrawPos();
}

function updateDrawPos() {
	var t = {
		x: this.width/2,
		y: this.height/2
	};

	this.drawPos = Point2D.minus(this.pos, t);
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
			if (!(this.bullets[i].onDestroy === undefined))
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
			this.inputs.shot3 = keys[p1.shot3];
			break;
		case 2:
			if (keys[p2.up]) this.inputs.vertical = -1;
			else if (keys[p2.down]) this.inputs.vertical = +1;
			else this.inputs.vertical = 0;

			if (keys[p2.right]) this.inputs.horizontal = 1;
			else if (keys[p2.left]) this.inputs.horizontal = -1;
			else this.inputs.horizontal = 0;

			this.inputs.dash = keys[p2.dash];
			this.inputs.shot1 = keys[p2.shot1];
			this.inputs.shot2 = keys[p2.shot2];
			// this.inputs.shot3 = keys[p2.shot3];
	}
}

function correctPosition() {
	// OUT OF SCREEN CODE
	
	if (this.pos.x > gameScreen.width + gameScreen.offset)
		this.pos.x = gameScreen.width + gameScreen.offset;
	else if (this.pos.x < gameScreen.offset)
		this.pos.x = gameScreen.offset;

	if (this.pos.y > gameScreen.height)
		this.pos.y = gameScreen.height;
	else if (this.pos.y < 0)
		this.pos.y = 0;
	

	// circle code
	// var midpoint = {
	// 	x: gameScreen.centerX,
	// 	y: gameScreen.centerY
	// };

	// var centerVector = Point2D.minus(this.pos, midpoint);

	// if (Point2D.dist(centerVector, Point2D.ZERO) > gameScreen.radius) {
	// 	centerVector = Point2D.norm(centerVector, gameScreen.radius);
	// 	this.pos = Point2D.plus(midpoint, centerVector);
	// }
}

// non-method functions


function playerDraw(player, context) {
	// draw player
	/*
	context.fillStyle = (player.stats.playerID == 1)? "blue" : "red";
	context.fillRect(player.drawPos.x, player.drawPos.y, player.width, player.height);
	context.strokeStyle = "black";
	context.lineWidth = "1";
	context.strokeRect(player.drawPos.x, player.drawPos.y, player.width, player.height);
	*/

	// draw bullets
	for (i = 0; i < player.bullets.length; i++) {
		var toDraw = {
			x: player.bullets[i].pos.x,
			y: player.bullets[i].pos.y,
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
	player.updateCooldowns();
	player.updateBullets();

	if (player.wait > 0)
		player.wait--;
	else player.shoot();
}

function updateCooldowns() {
	this.cooldown.shot1--;
	this.cooldown.shot2--;
	this.cooldown.shot3--;
}