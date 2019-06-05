function Grass(game, x, y, key, frame, player){
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

Grass.prototype = Object.create(Phaser.Sprite.prototype);
Grass.prototype.constructor = Grass;
Grass.prototype.update = function(){
	game.physics.arcade.overlap(this, this.player, this.hitGrass, null, this);
	this.animations.play('stay');
}

Grass.prototype.hitGrass = function(){
		this.player.etype = 'grass';
		this.collect.play();
		this.player.animations.stop(null,true);
		this.player.resetWeapon('grassBullet');
		this.player.resetType('grassIcon');
		this.kill();

}