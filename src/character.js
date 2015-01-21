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
	this.bullets.push(new bullet(defaultSpecs(), "shellring"));
}

function hikari_shot2() {
	this.bullets.push(new bullet(defaultSpecs(), "return"));
}

function cerise_shot1() {

}

function default_shot() {
	this.bullets.push(new bullet(defaultSpecs()));
}