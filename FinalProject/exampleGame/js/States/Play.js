//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
		health = 3;
	},

	preload: function() {


	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Create the background and two walls of the game
		// background = game.add.tileSprite(0, 0, 1600, 1600, "backGround");
		// leftWall = game.add.tileSprite(0,game.height/2, 50, game.height/2, "grassLeft");
		// rightWall = game.add.tileSprite(game.width-50, game.height/2, 50, game.height/2, "grassRight");
		// topWall1 = game.add.tileSprite(0,game.height/2, game.width/2-50, 50, "grass");
		// topWall2 = game.add.tileSprite(game.width/2+50,game.height/2, game.width/2-50, 50, "grass");

		game.world.setBounds(0, 0, 1600, 1600);

		//Create the spike that appear on the top of the game

		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('testTile', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.decoLayer = this.map.createLayer('Decoration');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

	
		door = game.add.tileSprite(780, 1325, 100, 10, "platform");
		fire = game.add.sprite(750, 1500, 'fire');
		ladder = game.add.sprite(450,950, 'ladder');
		game.physics.enable([door,fire,ladder], Phaser.Physics.ARCADE);
		fire.scale.setTo(0.2);
		ladder.body.immovable = true;
		door.body.collideWorldBounds = true;
		door.body.immovable = true;
		// topWall2.body.immovable = true;
		// topWall1.body.immovable = true;
		// leftWall.body.immovable = true;
		// rightWall.body.immovable = true;


		//Set player
		//Create the player
		this.player = new Players(game, game.world.centerX, 1400, 'orge', 1);
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Create baddies in this stage
		this.baddie1 = new Baddies(game, 450, 950, 'fireSpirit', 1,this.player);
		game.add.existing(this.baddie1);



		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		//Test tile properties




	},

	update: function() {
		// game.physics.arcade.collide(this.player, leftWall);

		// game.physics.arcade.collide(this.player, rightWall);

		// game.physics.arcade.collide(this.player, topWall1);

		// game.physics.arcade.collide(this.player, topWall2);

		game.physics.arcade.collide(this.player, this.wallLayer);

		game.physics.arcade.collide(this.baddie1, this.wallLayer);


		game.physics.arcade.collide(this.player.weapon.bullets, this.wallLayer, this.hitWall, null, this);

		if(this.player.etype != 'fire'){
			game.physics.arcade.collide(this.player, door);
		}else{
			game.physics.arcade.overlap(this.player, door, this.openDoor, null, this);
		}

		



		game.physics.arcade.overlap(this.player, fire, this.killFire, null, this);

		this.player.animations.play('run');

	},
	killFire: function(){
		fire.kill();
		this.player.etype = 'fire';
		this.player.resetWeapon('diamond');
	},

	openDoor: function(){
		if(this.player.etype == 'fire'){
			door.kill();
		}
		this.player.weapon.bullets.getAt(0).kill();
	},

	//Call back function when bullets hit on to the Wall
	hitWall:function(){
		console.log('check');
		this.player.weapon.bullets.getAt(0).kill();
	},
	//Debug the collision from tile map
	render:function(){
		this.wallLayer.debug = true;
	}


}

