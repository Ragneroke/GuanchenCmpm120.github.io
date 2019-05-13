//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.load.image('sky', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('star', 'assets/img/star.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('snowFlake', 'assets/img/snowflake.png');
		game.load.spritesheet('dude', 'assets/img/dude.png',32,48);
		game.load.spritesheet('baddie', 'assets/img/baddie.png',32,32);
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.stage.backgroundColor = "#facade";

	},
	create: function(){
		//Add a short intro for the game
		var menuText = game.add.text(16, 16, 'Start Catch Game\nUse Arrow Key To Move\nPress [Space] to Start', {fontSize: '32px', fill: '#000'});
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('Play');
		}
	}
}