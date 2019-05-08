
function Stars(game, speed, key, x, frame) {
	Phaser.Sprite.call(this, game, x, game.height + 15, key, frame);
	this.anchor.set(0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.velocity.y = -speed;
	this.newStars = true;
	popMusic = game.add.audio('pop');

}

Stars.prototype = Object.create(Phaser.Sprite.prototype);
Stars.prototype.constructor = Stars;

Stars.prototype.update = function(){
	if(this.newStar && this.y < game.height/2) {
		this.newStars = false;
		Play.prototype.addBlocks(this.parent);
	}
	game.physics.arcade.overlap(player, this, this.killStars, null, this);


	if(this.y < 0){
		this.kill();
	}
}

Stars.prototype.killStars = function(){
	this.kill();
	popMusic.play();
	score += 200;
	text.setText('Your score: ' + score);
}

