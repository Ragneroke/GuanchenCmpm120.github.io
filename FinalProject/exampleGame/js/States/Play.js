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
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);


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

		//Setup other stuff for the game
		door = game.add.tileSprite(830, 1325, 100, 10, "platform");
		fire = game.add.sprite(750, 1500, 'fire');
		ladder = game.add.sprite(450,950, 'ladder');
		game.physics.enable([door,fire,ladder], Phaser.Physics.ARCADE);
		fire.scale.setTo(0.2);
		ladder.body.immovable = true;
		door.body.collideWorldBounds = true;
		door.body.immovable = true;


		//Set player
		//Create the player
		this.player = new Players(game, game.world.centerX, 1400, 'slime', 1);
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Create baddies in this stage
		this.baddie1 = new BaddiesA(game, 450, 950, 'fireSpirit', 1, this.player);
		game.add.existing(this.baddie1);

		//Setup background music
		this.bgmMusic = game.add.audio('bgm');
		this.bgmMusic.volume = 0.2;
		this.bgmMusic.play();
		this.openMusic = game.add.audio('open');
		this.openMusic.volume = 0.2;


		//Setup the Hud here
		//Setup the text for health
		this.healthText = game.add.text(600, 1000, 'Health: 5', {fontSize: '32px', fill: '#DBE639'});
		this.healthText.fixedToCamera = true;
		this.healthText.cameraOffset.setTo(50,50);

		//Setup the text for type
		this.typeText = game.add.text(600, 1000, 'Type: Null', {fontSize: '32px', fill: '#DBE639'});
		this.typeText.fixedToCamera = true;
		this.typeText.cameraOffset.setTo(50,100);

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		//Set Instructions
		this.ins1 = game.add.text(830, 1300, 'Change element to break blocks!', {fontSize: '15px', fill: '#DBE639'});
		this.ins2 = game.add.text(750, 1450, 'Eat elements to change your form!', {fontSize: '15px', fill: '#DBE639'});
		this.ins3 = game.add.text(450, 920, 'Kill enemy by bullets!', {fontSize: '15px', fill: '#DBE639'});




	},

	update: function() {

		game.physics.arcade.collide(this.player, this.wallLayer);

		game.physics.arcade.collide(this.baddie1, this.wallLayer);


		game.physics.arcade.collide(this.player.weapon.bullets, this.wallLayer, this.hitWall, null, this);

		game.physics.arcade.collide(this.player.weapon.bullets, door, this.hitWall, null, this);

		if(this.player.etype != 'fire'){
			game.physics.arcade.collide(this.player, door);
		}else{
			game.physics.arcade.overlap(this.player, door, this.openDoor, null, this);
		}


		game.physics.arcade.overlap(this.player, fire, this.killFire, null, this);

		if(this.baddie1 != null){
			game.physics.arcade.overlap(this.baddie1.weapon1.bullets, this.player, this.hitPlayer, null, this);
		}

		game.physics.arcade.overlap(this.player.weapon.bullets, this.baddie1, this.hitBaddie, null, this);

		game.physics.arcade.overlap(this.player, ladder, this.climbLadder, null, this);

		this.player.animations.play('run');

	},
	killFire: function(){
		fire.kill();
		this.player.etype = 'fire';
		this.player.resetWeapon('diamond');
		this.typeText.kill();
		this.typeText = game.add.text(600, 1000, 'Type: Fire', {fontSize: '32px', fill: '#DBE639'});
		this.typeText.fixedToCamera = true;
		this.typeText.cameraOffset.setTo(50,100);
	},

	openDoor: function(){
		if(this.player.etype == 'fire'){
			door.kill();
		}
		this.openMusic.play();
		this.player.weapon.bullets.getAt(0).kill();
	},

	//Call back function when bullets hit on to the Wall
	hitWall:function(){
		this.player.weapon.bullets.getAt(0).kill();
	},

	hitBaddie:function(){
		this.player.weapon.bullets.getAt(0).kill();
		this.baddie1.health -=1;
		if(this.player.currentDir == 270){
			this.baddie1.y -= 20;
		}
		if(this.baddie1.health <= 0) {
			this.baddie1.kill();
			this.baddie1.statNow = false;
			this.baddie1 = null;
		}
	},

	hitPlayer:function(){
		if(this.baddie1.weapon1 != null){
			this.baddie1.weapon1.bullets.getAt(0).kill();
		}
		this.player.health -= 1;
		this.healthText.kill();
		this.healthText = game.add.text(600, 1000, 'Health: ' + this.player.health, {fontSize: '32px', fill: '#DBE639'});
		this.healthText.fixedToCamera = true;
		this.healthText.cameraOffset.setTo(50,50);

		if(this.player.health <= 0){
			this.bgmMusic.kill();
			game.state.start('GameOver');

		}
	},
	climbLadder:function(){
		if(this.baddie1 == null){
			this.bgmMusic.stop();
			game.state.start('Stage1');
		}
		console.log(this.baddie1);
	},
	//Debug the collision from tile map
	render:function(){
	}


}

