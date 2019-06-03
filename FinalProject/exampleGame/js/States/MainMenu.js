//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.load.image('star', 'assets/img/star.png');
		game.load.image('backGround', 'assets/img/BackGround.png');
		game.load.image('aid', 'assets/img/heart.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('fireBullet', 'assets/img/fireBullets.png');
		game.load.image('noneIcon', 'assets/img/noneIcon.png');
		game.load.image('fireIcon', 'assets/img/fireIcon.png');
		game.load.image('waterIcon', 'assets/img/waterIcon.png');
		game.load.image('treeIcon', 'assets/img/treeIcon.png');
		game.load.image('bonfire', 'assets/img/bonfire.png');
		game.load.audio('bgm', 'assets/audio/fish.mp3');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.audio('open', 'assets/audio/open.wav');
		game.load.spritesheet('fireSpirit', 'assets/img/messy.png',37,32);
		game.load.spritesheet('ladder', 'assets/img/ladder.png',32,32);
		game.load.atlas('iceSprite', 'assets/img/iceSprite.png', 'assets/img/iceSprite.json');
		game.load.atlas('fireSprite', 'assets/img/fireSprite.png', 'assets/img/fireSprite.json');
		game.load.atlas('leafSprite', 'assets/img/leafSprite.png', 'assets/img/leafSprite.json');
		game.load.atlas('slime', 'assets/img/slimeWhite.png', 'assets/img/slimeWhite.json');
		game.load.atlas('slimeAll', 'assets/img/slimeAll.png', 'assets/img/slimeAll.json');
		game.load.atlas('slimeRest', 'assets/img/whiteRest.png', 'assets/img/whiteRest.json');
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
		game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('testStage');
		}
	},
	makeText:function(){
		this.text1 = game.add.text(16, 16, 'Adventure of Slime\nUse Arrow Key To Move\nSpace shoot bullets\nPress [Space] to Start');
		this.text1.fill = "#000000";
		this.text1.font = 'ZCOOL KuaiLe';
	}
}