function Heart(game, x, y, key, frame, player,state){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.1);
	this.body.setSize(130,130,100,75);
	this.player = player;
	this.animations.add('stay', [0], 10, true);
	this.collect = game.add.audio('collect');
	this.collect.volume = 0.3;
	this.state = state;
}

Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;
Heart.prototype.update = function(){
	game.physics.arcade.overlap(this, this.player, this.getHealth, null, this);
	this.animations.play('stay');
}

Heart.prototype.getHealth = function(){
	this.player.health += 1;
	this.state.setHealth(this.player.health);
	this.kill();

}