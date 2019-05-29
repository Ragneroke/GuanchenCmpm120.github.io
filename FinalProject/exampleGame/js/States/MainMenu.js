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
		game.load.audio('bgm', 'assets/audio/fish.mp3');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.audio('open', 'assets/audio/open.wav');
		game.load.spritesheet('fireSpirit', 'assets/img/messy.png',37,32);
		game.load.spritesheet('ladder', 'assets/img/ladder.png',32,32);
		game.load.atlas('orge', 'assets/img/mainCharacter.png', 'assets/img/mainCharacter.json');
		game.load.atlas('slime', 'assets/img/slimeblue.png', 'assets/img/slimeblue.json');
		game.load.tilemap('map', 'assets/tileTest/testMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('stage0', 'assets/tileTest/stage0.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('stage1', 'assets/tileTest/StageFirst.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('test', 'assets/tileTest/tileSheet.png');
		game.load.image('stage0m', 'assets/tileTest/stage0.png');
		game.load.image('stage1m', 'assets/tileTest/Stage1.png');
		game.stage.backgroundColor = "#facade";

	},
	create: function(){
		//Add a short intro for the game
		var menuText = game.add.text(16, 16, 'Adventure of Slime\nUse Arrow Key To Move\nSpace shoot bullets\nPress [Space] to Start', {fontSize: '32px', fill: '#000'});
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('testStage');
		}
	}
}