//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.load.image('star', 'assets/img/star.png');
		game.load.image('grass', 'assets/img/grass.png');
		game.load.image('grassLeft', 'assets/img/grassLeft.png');
		game.load.image('grassRight', 'assets/img/grassRight.png');
		game.load.image('backGround', 'assets/img/BackGround.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('fire', 'assets/img/fire.png');
		game.load.image('aid', 'assets/img/firstaid.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.atlas('orge', 'assets/img/mainCharacter.png', 'assets/img/mainCharacter.json');
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