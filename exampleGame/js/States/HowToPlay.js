HowToPlay.prototype = {
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

		//Set up the game title
		this.title = game.add.sprite(game.world.centerX, game.world.centerY, 'howtoplay');
		this.title.fixedToCamera = true;
		this.title.anchor.setTo(0.5,0.5);
		this.title.cameraOffset.setTo(400,400);

		//Set camera for Main Menu
		game.camera.x =game.world.centerX+300;
		game.camera.y = game.world.centerY;
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('Stage0');
		}
	},
	makeText:function(){
	}
}