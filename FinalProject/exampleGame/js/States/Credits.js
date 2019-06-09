Credits.prototype = {
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
		this.text1 = game.add.text(100,100,"Thanks for playing our game!\nCMPM 120 & ARTG 120 \nProfessor Nathan Altice & Elizabeth Swensen\nGROUP 7 Team Large Soda\nProgrammer: Guanchen Liu\nArtist and Animation: Ying Luo\nSound and tile art: Jian Wu\nEnding Song: “Roundabout” by Yes\nThanks to our TA Richard Grillotti\n\nAnd thanks to everyone who playtest our games!\nPress SPACE to return to Main Menu");
        this.text1.font = 'ZCOOL KuaiLe';
        this.text1.fill = '#000000';
		this.text1.fixedToCamera = true;
		this.text1.anchor.setTo(0.5,0.5);
		this.text1.cameraOffset.setTo(400,400);

		//Set camera for Main Menu
		game.camera.x =game.world.centerX+300;
		game.camera.y = game.world.centerY;
			
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('MainMenu');
		}
	},
	makeText:function(){
	}
}