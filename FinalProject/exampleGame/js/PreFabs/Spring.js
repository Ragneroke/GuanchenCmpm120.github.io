//The water element in the game
//Player will change in to water type after overlap with it
function Spring(game, x, y, key, frame, player){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.2);
	this.player = player;
	this.animations.add('stay', [0,0,1,1], 10, true);
	this.collect = game.add.audio('collect');
	this.collect.volume = 0.3;
}

Spring.prototype = Object.create(Phaser.Sprite.prototype);
Spring.prototype.constructor = Spring;
Spring.prototype.update = function(){
	game.physics.arcade.overlap(this, this.player, this.hitGrass, null, this);
	this.animations.play('stay');
}

Spring.prototype.hitGrass = function(){
		this.player.etype = 'water';
		this.collect.play();
		this.player.animations.stop(null,true);
		this.player.resetWeapon('waterBullet');
		this.player.resetType('waterIcon');
		this.kill();

}