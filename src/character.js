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


function hikari_shot1() {
	var b = {
		player: this,
		x: this.centerX,
		y: this.centerY,
		facing: this.facing
	};
	this.bullets.push(new bullet(b, "shellring"));
}

function hikari_shot2() {
	var b = {
		player: this,
		x: this.centerX,
		y: this.centerY,
		facing: this.facing
	};
	this.bullets.push(new bullet(b, "return"));
}

function default_shot() {
	var b = {
		player: this,
		x: this.centerX,
		y: this.centerY,
		facing: this.facing
	};
	this.bullets.push(new bullet(b));
}