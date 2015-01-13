function playerMove() {
	this.pos.x += this.keypress.dash * this.keypress.horizontal;
	this.pos.y += this.keypress.dash * this.keypress.vertical;

	this.correctPosition();

	this.centerX = this.pos.x + this.width/2;
	this.centerY = this.pos.y + this.height/2;
}

function playerShoot() {

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
			if (keys[p1.up]) this.keypress.vertical = -1;
			else if (keys[p1.down]) this.keypress.vertical = 1;
			else this.keypress.vertical = 0;

			if (keys[p1.right]) this.keypress.horizontal = 1;
			else if (keys[p1.left]) this.keypress.horizontal = -1;
			else this.keypress.horizontal = 0;

			if (keys[p1.dash]) this.keypress.dash = 5;
			else this.keypress.dash = 1;
			break;
		case 2:
			if (keys[p2.up]) this.keypress.vertical = -1;
			else if (keys[p2.down]) this.keypress.vertical = +1;
			else this.keypress.vertical = 0;

			if (keys[p2.right]) this.keypress.horizontal = 1;
			else if (keys[p2.left]) this.keypress.horizontal = -1;
			else this.keypress.horizontal = 0;

			if (keys[p2.dash]) this.keypress.dash = 5;
			else this.keypress.dash = 1;
	}
}

// non-method functions
function playerDraw(player, context) {
	context.fillStyle = (player.stats.playerID == 1)? "blue" : "red";
	context.fillRect(player.pos.x, player.pos.y, player.width, player.height);
	context.strokeStyle = "black";
	context.lineWidth = "1";
	context.strokeRect(player.pos.x, player.pos.y, player.width, player.height);

	/*
	for (i = 0; i < player.bullets.length; i++) {
		var toDraw = {
			x: player.bullets[i].x,
			y: player.bullets[i].y,
			size: player.bullets[i].size,
			color: (player.stats.playerID == 1)? 'green' : 'purple'
			// dose kek
		};

		if (!player.bullets[i].destroyed)
			player.bullets[i].draw(toDraw);
	}
	*/
}

function playerUpdate(player, enemy) {
	player.takeInput();

	player.enemy = enemy;
	player.target = {
		x: enemy.pos.x,
		y: enemy.pos.y
	};

	player.updateBullets();

	if (player.wait > 0)
		player.wait--;
	//else player.shoot();
}
