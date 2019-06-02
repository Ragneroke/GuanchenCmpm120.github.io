Stage1.prototype = {
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
		this.map = game.add.tilemap('stage1');
		this.map.addTilesetImage('Tileset1', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('Background1');
		this.wallLayer = this.map.createLayer('Collision1');
		this.decoLayer = this.map.createLayer('Decoration1');
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
		this.player = new Players(game, game.world.centerX, game.world.centerY, 'slime', 1);
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Create baddies in this stage
		this.enemies = game.add.group();
		this.addBaddies(this.enemies, 700, 700);
		this.addBaddies(this.enemies, 900, 900);
		this.addBaddies(this.enemies, 500, 500);
		this.addBaddies(this.enemies, 1000, 800);

		//Setup background music
		this.bgmMusic = game.add.audio('bgm');
		this.bgmMusic.volume = 0.2;
		this.bgmMusic.play();
		this.openMusic = game.add.audio('open');
		this.openMusic.volume = 0.2;


		//Setup the Hud here
		//Setup the text for health
		this.healthText = game.add.text(600, 1000, 'Health: 3', {fontSize: '32px', fill: '#000'});
		this.healthText.fixedToCamera = true;
		this.healthText.cameraOffset.setTo(50,50);

		//Setup the text for type
		this.typeText = game.add.text(600, 1000, 'Type: Null', {fontSize: '32px', fill: '#000'});
		this.typeText.fixedToCamera = true;
		this.typeText.cameraOffset.setTo(50,100);

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		//Set Instructions
		this.ins3 = game.add.text(450, 920, 'Kill all enemies to continue!!', {fontSize: '15px', fill: '#000'});




	},

	update: function() {

		game.physics.arcade.collide(this.player, this.wallLayer);

		game.physics.arcade.collide(this.enemies, this.wallLayer);

		game.physics.arcade.collide(this.enemies, this.enemies);


		game.physics.arcade.collide(this.player.weapon.bullets, this.wallLayer, this.hitWall, null, this);

		game.physics.arcade.collide(this.player.weapon.bullets, door, this.hitWall, null, this);

		if(this.player.etype != 'fire'){
			game.physics.arcade.collide(this.player, door);
		}
		// }else{
		// 	game.physics.arcade.overlap(this.player, door, this.openDoor, null, this);
		// }


		game.physics.arcade.overlap(this.player, fire, this.killFire, null, this);

		// game.physics.arcade.overlap(this.player.weapon.bullets, enemies, this.hitBaddie, null, this);

		game.physics.arcade.overlap(this.player, ladder, this.climbLadder, null, this);

		this.player.animations.play('run');

	},
	killFire: function(){
		fire.kill();
		this.player.etype = 'fire';
		this.player.resetWeapon('diamond');
		this.typeText.kill();
		this.typeText = game.add.text(600, 1000, 'Type: Fire', {fontSize: '32px', fill: '#000'});
		this.typeText.fixedToCamera = true;
		this.typeText.cameraOffset.setTo(50,100);
		console.log(this.typeText);
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


	climbLadder:function(){
		if(this.baddie1 == null){
			this.bgmMusic.stop();
			game.state.start('GameOver');
		}
		console.log(this.baddie1);
	},
	addBaddies:function(group, x, y){
		var baddy = new Baddies(game, x, y, 'fireSpirit', 1, this.player);
		game.add.existing(baddy);
		group.add(baddy);
	},
	// baddyHitWall:function(){
	// 	this.baddie1.weapon.bullets.getAt(0).kill();
	// },
	//Debug the collision from tile map
	render:function(){
	}


}