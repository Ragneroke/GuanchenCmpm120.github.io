function Water(game, x, y, key, frame, player){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.player = player;
	this.animations.add('stay', [0,0,0,0,1,1,1,1,1,0], 10, true);
}

Water.prototype = Object.create(Phaser.Sprite.prototype);
Water.prototype.constructor = Water;
Water.prototype.update = function(){
	if(this.player.etype != 'water'){
		game.physics.arcade.collide(this, this.player);
	}
	this.animations.play('stay');
}
