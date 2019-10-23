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

		//Set up the game title
		this.title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
		this.title.fixedToCamera = true;
		this.title.anchor.setTo(0.5,0.5);
		this.title.cameraOffset.setTo(400,200);

		//Set up the start option
		this.start = game.add.sprite(game.world.centerX, game.world.centerY, 'start');
		this.start.fixedToCamera = true;
		this.start.anchor.setTo(0.5,0.5);
		this.start.cameraOffset.setTo(400,500);

		//Set up the credit option
		this.credit = game.add.sprite(game.world.centerX, game.world.centerY, 'credit');
		this.credit.fixedToCamera = true;
		this.credit.anchor.setTo(0.5,0.5);
		this.credit.cameraOffset.setTo(400,600);

		//Set up the selection cursors
		this.choose = game.add.sprite(game.world.centerX, game.world.centerY, 'choose');
		this.choose.fixedToCamera = true;
		this.choose.anchor.setTo(0.5,0.5);
		this.choose.cameraOffset.setTo(250,500);

		//Set up text for instruction
		this.text1 = game.add.text(game.world.centerX, game.world.centerY,"Press Space to Select");
		this.text1.font = 'ZCOOL KuaiLe';
		this.text1.fill = '#000000'
		this.text1.fixedToCamera = true;;
		this.text1.anchor.setTo(0.5,0.5);
		this.text1.cameraOffset.setTo (400, 750);

		this.condition = 0;

		//Set camera for Main Menu
		game.camera.x =game.world.centerX-650;
		game.camera.y = 1400;
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			if(this.condition == 0){
				game.state.start('HowToPlay');
			}else{
				game.state.start('Credits');
			}
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			this.choose.cameraOffset.setTo(200,600);
			this.condition = 1;

		}else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.choose.cameraOffset.setTo(250,500);
			this.condition = 0;
		}
	},
	makeText:function(){
	}
}