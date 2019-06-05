function Portal(game, x, y, key, frame, player, count, stage){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.15);
	this.player = player;
	this.count = count;
	this.stage = stage;
	this.animations.add('stay', [2], 10, true);
	this.animations.add('activate', [0,0,1,1,2,2], 10, true);
	this.finish = game.add.audio('finish');
	this.finish.volume = 0.3;
	this.musicPlay = true;
}

Portal.prototype = Object.create(Phaser.Sprite.prototype);
Portal.prototype.constructor = Portal;
Portal.prototype.update = function(){
	game.physics.arcade.overlap(this, this.player, this.hitPortal, null, this);
	if(this.count != 0){
		this.animations.play('stay');
	}else{
		if(this.musicPlay){
			this.finish.play();
			this.musicPlay = false;
		}
		this.animations.play('activate');
	}
}

Portal.prototype.hitPortal = function(){
		if(this.count == 0){
			this.stage.bgmMusic.stop();
			if(stageCount == 0){
			game.state.start('Stage1');
		}

		}

}
