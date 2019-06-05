function BonFire(game, x, y, key, frame, player){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.2);
	this.player = player;
	this.animations.add('stay', [0,0,1,1], 10, true);
}

BonFire.prototype = Object.create(Phaser.Sprite.prototype);
BonFire.prototype.constructor = BonFire;
BonFire.prototype.update = function(){
	game.physics.arcade.overlap(this, this.player, this.hitFire, null, this);
	this.animations.play('stay');
}

BonFire.prototype.hitFire = function(){
		this.player.etype = 'fire';
		this.player.animations.stop(null,true);
		this.player.resetWeapon('fireBullet');
		this.player.resetType('fireIcon');
		this.kill();

}
