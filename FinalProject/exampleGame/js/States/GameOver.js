//Game over State
//Player can retry the game by pressing space bar
GameOver.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#000000";

	},
	create: function(){
		this.level = game.add.sprite(0,0,'gameOver');
		this.level.fixedToCamera = true;
		this.level.cameraOffset.setTo(0,0);
		this.level.alpha = 0;
		this.fade = game.add.tween(this.level).to( { alpha: 1 },2000, Phaser.Easing.Linear.None, true);
	},
	update: function(){
		score = 0;
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}

}