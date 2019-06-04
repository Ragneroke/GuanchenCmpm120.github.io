//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){

	},
	create: function(){
		//Add a short intro for the game
		game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);


		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage0');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		this.title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
		this.title.fixedToCamera = true;
		this.title.anchor.setTo(0.5,0.5);
		this.title.cameraOffset.setTo(400,200);

		this.start = game.add.sprite(game.world.centerX, game.world.centerY, 'start');
		this.start.fixedToCamera = true;
		this.start.anchor.setTo(0.5,0.5);
		this.start.cameraOffset.setTo(400,500);

		this.credit = game.add.sprite(game.world.centerX, game.world.centerY, 'credit');
		this.credit.fixedToCamera = true;
		this.credit.anchor.setTo(0.5,0.5);
		this.credit.cameraOffset.setTo(400,600);

		this.choose = game.add.sprite(game.world.centerX, game.world.centerY, 'choose');
		this.choose.fixedToCamera = true;
		this.choose.anchor.setTo(0.5,0.5);
		this.choose.cameraOffset.setTo(250,500);
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('Stage0');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			this.choose.cameraOffset.setTo(200,600);
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.choose.cameraOffset.setTo(250,500);
		}
	},
	makeText:function(){
	}
}