//This file will create the blocks during the game

function Blocks(game, speed, width, height, x, key, frame) {
	Phaser.TileSprite.call(this, game, x,
		game.height + 50, width, height, key, frame);
	this.anchor.set(0.5);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.velocity.y = -speed;
	this.newBlocks = true;

}

Blocks.prototype = Object.create(Phaser.TileSprite.prototype);
Blocks.prototype.constructor = Blocks;

Blocks.prototype.update = function(){
	if(this.newBlocks && this.y < game.height/2) {
		this.newBlocks = false;
		Play.prototype.addBlocks(this.parent);
	}

	//game.debug.body(this);
	//game.debug.spriteInfo(this, 32, 32);
	if(this.y < 0){
		this.kill();
	}
}