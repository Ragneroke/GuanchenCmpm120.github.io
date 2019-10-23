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

		//Set up the selection cursors
		this.choose = game.add.sprite(game.world.centerX, game.world.centerY, 'choose');
		this.choose.fixedToCamera = true;
		this.choose.anchor.setTo(0.5,0.5);
		this.choose.cameraOffset.setTo(130,520);

		this.condition = 0;

	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.condition == 0) {
			if(stageCount == 0){
				game.state.start('Stage0');
			}else if(stageCount == 1){
				game.state.start('Stage1');
			}else if(stageCount == 2){
				game.state.start('Stage2');
			}else if(stageCount == 3){
				game.state.start('Stage3');
			}else if(stageCount == 4){
				game.state.start('Stage4');
			}
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.condition == 1){
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			this.choose.cameraOffset.setTo(230,620);
			this.condition = 1;

		}else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.choose.cameraOffset.setTo(130,520);
			this.condition = 0;
		}
	}

}