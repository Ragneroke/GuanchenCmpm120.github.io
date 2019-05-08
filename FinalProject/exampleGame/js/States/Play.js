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
		background = game.add.tileSprite(0, 0, 600, 700, "backGround");
		leftWall = game.add.tileSprite(0,game.height/2, 50, game.height/2, "grassLeft");
		rightWall = game.add.tileSprite(game.width-50, game.height/2, 50, game.height/2, "grassRight");
		topWall1 = game.add.tileSprite(0,game.height/2, game.width/2-50, 50, "grass");
		topWall2 = game.add.tileSprite(game.width/2+50,game.height/2, game.width/2-50, 50, "grass");
		door = game.add.tileSprite(game.width/2-50, game.height/2, 100, 10, "platform");
		fire = game.add.sprite(60, 500, 'fire');
		fire.scale.setTo(0.2);

		//Create the spike that appear on the top of the game
		game.physics.enable([leftWall, rightWall,topWall1,topWall2,door,fire], Phaser.Physics.ARCADE);

		//Set physics
		leftWall.body.collideWorldBounds = true;
		rightWall.body.collideWorldBounds = true;
		topWall1.body.collideWorldBounds = true;
		topWall2.body.collideWorldBounds = true;
		door.body.collideWorldBounds = true;
		door.body.immovable = true;
		topWall2.body.immovable = true;
		topWall1.body.immovable = true;
		leftWall.body.immovable = true;
		rightWall.body.immovable = true;


		//Set player
		//Create the player

		this.player = new Players(game, game.world.centerX, game.world.centerY + 200, 'orge', 1);
		game.add.existing(this.player);

		//Create the weapon



		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);



	},

	update: function() {
		game.physics.arcade.collide(this.player, leftWall);

		game.physics.arcade.collide(this.player, rightWall);

		game.physics.arcade.collide(this.player, topWall1);

		game.physics.arcade.collide(this.player, topWall2);

		game.physics.arcade.collide(this.player, door);

		game.physics.arcade.collide(this.player, door);

		game.physics.arcade.overlap(this.player.weapon.bullets, door, this.openDoor, null, this);

		game.physics.arcade.overlap(this.player, fire, this.killFire, null, this);
		this.player.animations.play('run');

	},
	killFire: function(){
		fire.kill();
		this.player.etype = 'fire';
	},
	openDoor: function(){
		if(this.player.etype == 'fire'){
			door.kill();
		}
	}

}

