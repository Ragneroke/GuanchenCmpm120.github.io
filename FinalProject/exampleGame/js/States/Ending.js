Ending.prototype = {
	preload: function(){

	},
	create: function(){
		game.stage.backgroundColor = '#232323';
		this.video =  game.add.video('ending');
		this.video.play(false);
		sprite = this.video.addToWorld(0, 0);
		game.time.events.add(35000, this.toBeContinue, this);
		this.skip = false;
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.skip) {
			//Press the space to start the play state
			this.video.stop();
			game.state.start('MainMenu');
		}

	},
	toBeContinue: function(){
		this.text1 = game.add.text(200,200,"Thanks for playing our game!\nEnding song:Roundabout by Yes\n Press space back to Main Menu");
		this.text1.font = 'ZCOOL KuaiLe';
		this.text1.fill = '#ffffff';
		this.skip = true;
	}

}