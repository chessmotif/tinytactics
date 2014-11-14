// INSTANTIATE PLAYER

function player(x, y, no) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 20;
	this.playerID = no;

	this.facing = 0;

	this.centerX = this.x + this.width/2;
	this.centerY = this.y + this.height/2;

	this.bullets = [];

	this.wait = 0;

	// PLAYER STATS

	this.maxHP = 100;
	this.currHP = 100;

	// PLAYER METHODS

	// player-number dependent actions
	this.move = (this.playerID == 1)? player1Move : player2Move;
	this.shoot = (this.playerID == 1)? player1Shoot : player2Shoot;

	// draw function, change this to drawing an image sooner or later
	this.draw = function(context) {
		context.fillStyle = (this.playerID==1)? "blue" : "red";
		context.fillRect(this.x, this.y, this.width, this.height);
		context.strokeStyle = "black";
		context.lineWidth = "1";
		context.strokeRect(this.x, this.y, this.width, this.height);

		for (i = 0; i < this.bullets.length; i++) {
			var toDraw = {
				x: this.bullets[i].x,
				y: this.bullets[i].y,
				size: this.bullets[i].size,
				color: (this.playerID == 1)? 'green' : 'purple'
				// dose kek
			};

			if (!this.bullets[i].destroyed)
				this.bullets[i].draw(toDraw);
		}
	};

	this.update = function(context, enemy) {
		this.facing = Math.atan2(enemy.y - this.y, enemy.x - this.x);

		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].destroyed) {
				this.bullets[i].onDestroy();
				this.bullets.splice(i, 1);
			}
		}

		for (var i = 0; i < this.bullets.length; i++)
			this.bullets[i].update();

		if (this.wait > 0)
			this.wait--;
		else
			this.shoot();

		this.draw(context);
	};

	this.correctPosition = function() {
		if (this.x + this.width > gameScreen.width + gameScreen.offset)
			this.x = gameScreen.width - this.width + gameScreen.offset;
		else if (this.x < gameScreen.offset)
			this.x = gameScreen.offset;

		if (this.y + this.height > gameScreen.height)
			this.y = gameScreen.height - this.height;
		else if (this.y < 0)
			this.y = 0;
	}
}

function player1Move() {
	var moveTo = {
		x: this.x,
		y: this.y
	}

	// arrow keys, V for dash
	if (keys[37]) moveTo.x -= (keys[86])? 5 : 1;			// left
	else if (keys[39]) moveTo.x += (keys[86])? 5 : 1;		// right
	if (keys[38]) moveTo.y -= (keys[86])? 5 : 1;			// up
	else if (keys[40]) moveTo.y += (keys[86])? 5 : 1;		// down

	this.x = moveTo.x;
	this.y = moveTo.y;

	this.correctPosition();

	this.centerX = this.x + this.width/2;
	this.centerY = this.y + this.height/2;
}


function player2Move() {
	var moveTo = {
		x: this.x,
		y: this.y
	}

	// WSAD, L for dash
	if (keys[65]) moveTo.x -= (keys[76])? 5 : 1;			// left
	else if (keys[68]) moveTo.x += (keys[76])? 5 : 1;		// right
	if (keys[87]) moveTo.y -= (keys[76])? 5 : 1;			// up
	else if (keys[83]) moveTo.y += (keys[76])? 5 : 1;		// down

	this.x = moveTo.x;
	this.y = moveTo.y;

	this.correctPosition();

	this.centerX = this.x + this.width/2;
	this.centerY = this.y + this.height/2;
}

function player1Shoot() {
	if (keys[90]) { // Z key
		var b = {
			player: this,
			x: this.centerX,
			y: this.centerY,
			facing: this.facing
		};
		
		this.bullets.push(new bullet(b, "shrapnel"));
	}
	else if (keys[88]) { // X key
		var b = {
			player: this,
			x: this.centerX,
			y: this.centerY,
			facing: this.facing
		};
		
		this.bullets.push(new bullet(b, "ring"));
	}
}

function player2Shoot() {
	if (keys[72]) { // H
		var b = {
			player: this,
			x: this.centerX,
			y: this.centerY,
			facing: this.facing
		};
		
		this.bullets.push(new bullet(b, "return"));
	}
	if (keys[74]) { // J
		var b = {
			player: this,
			x: this.centerX,
			y: this.centerY,
			facing: this.facing
		};
		
		this.bullets.push(new bullet(b, "shellring"));
	}
}