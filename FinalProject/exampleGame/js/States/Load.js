Load.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);
		game.load.image('star', 'assets/img/star.png');
		game.load.image('backGround', 'assets/img/BackGround.png');
		game.load.image('aid', 'assets/img/heart.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('fireBullet', 'assets/img/fireBullets.png');
		game.load.image('waterBullet', 'assets/img/waterbullet.png');
		game.load.image('treeBullet', 'assets/img/treebullet.png');
		game.load.image('noneIcon', 'assets/img/noneIcon.png');
		game.load.image('fireIcon', 'assets/img/fireIcon.png');
		game.load.image('waterIcon', 'assets/img/waterIcon.png');
		game.load.image('treeIcon', 'assets/img/treeIcon.png');
		game.load.atlas('bonfire', 'assets/img/bonfire.png', 'assets/img/bonfire.json');
		game.load.image('start', 'assets/img/start.png');
		game.load.image('credit', 'assets/img/credits.png');
		game.load.image('choose', 'assets/img/choose.png');
		game.load.image('level1', 'assets/img/level.png');
		game.load.image('level2', 'assets/img/level2.png');
		game.load.image('gameOver', 'assets/img/GameOver.png');
		game.load.audio('bgm', 'assets/audio/fish.mp3');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.audio('open', 'assets/audio/open.wav');
		game.load.audio('finish', 'assets/audio/finish.wav');
		game.load.spritesheet('fireSpirit', 'assets/img/messy.png',37,32);
		game.load.spritesheet('ladder', 'assets/img/ladder.png',32,32);
		game.load.atlas('iceSprite', 'assets/img/iceSprite.png', 'assets/img/iceSprite.json');
		game.load.atlas('fireSprite', 'assets/img/fireSprite.png', 'assets/img/fireSprite.json');
		game.load.atlas('leafSprite', 'assets/img/leafSprite.png', 'assets/img/leafSprite.json');
		game.load.atlas('slime', 'assets/img/slimeWhite.png', 'assets/img/slimeWhite.json');
		game.load.atlas('slimeAll', 'assets/img/slimeAll.png', 'assets/img/slimeAll.json');
		game.load.atlas('slimeRest', 'assets/img/whiteRest.png', 'assets/img/whiteRest.json');
		game.load.atlas('water', 'assets/img/water.png', 'assets/img/water.json');
		game.load.atlas('lava', 'assets/img/lava.png', 'assets/img/lava.json');
		game.load.atlas('portal', 'assets/img/portal.png', 'assets/img/portal.json');
		game.load.tilemap('map', 'assets/tileTest/testMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('stage0', 'assets/tileTest/stage0.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('stage1', 'assets/tileTest/stage1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('test', 'assets/tileTest/tileSheet.png');
		game.load.image('stage0m', 'assets/tileTest/stage0.png');
		game.load.image('stage1m', 'assets/tileTest/stage1.png');
		game.load.image('title', 'assets/img/gameTitle.png');
		game.stage.backgroundColor = "#000000";

	},
	create: function(){
		game.state.start('MainMenu');
	}
}