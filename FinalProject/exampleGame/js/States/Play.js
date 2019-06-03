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
		this.map = game.add.tilemap('stage0');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Setup other stuff for the game
		door = game.add.tileSprite(game.world.centerX-155, 1190, 120, 30, "platform");
		fire = game.add.sprite(game.world.centerX - 530, 1950, 'bonfire');
		fire.scale.setTo(0.5);
		ladder = game.add.sprite(game.world.centerX-155,550, 'ladder');
		game.physics.enable([door,fire,ladder], Phaser.Physics.ARCADE);
		fire.scale.setTo(0.2);
		ladder.body.immovable = true;
		door.body.collideWorldBounds = true;
		door.body.immovable = true;


		//Create the player
		this.player = new Players(game, game.world.centerX-300, 1900, 'slimeAll', 1);
		game.add.existing(this.player);
		game.camera.follow(this.player);


		//Create baddies in this stage

		this.baddie1 = new BaddiesA(game, game.world.centerX, 850, 'leafSprite', 1, this.player);
		game.add.existing(this.baddie1);

		//Setup background music
		this.bgmMusic = game.add.audio('bgm');
		this.bgmMusic.volume = 0.2;
		this.bgmMusic.play();
		this.openMusic = game.add.audio('open');
		this.openMusic.volume = 0.2;


		//Setup the Hud here
		//Setup the text for health
		this.healthText = game.add.text(16, 16, 'HP:');
		this.healthText.fixedToCamera = true;
		this.healthText.cameraOffset.setTo(15,15);
		this.healthText.font = 'ZCOOL KuaiLe';
		this.healthText.font = 'ZCOOL KuaiLe';
		this.healthText.fill = '#404040';
		this.healthText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.health = game.add.group();
		this.setHealth(this.player.maxHealth);

		//Setup the icon for type
		this.typeText = game.add.text(16,16, 'Type');
		this.typeText.fixedToCamera = true;
		this.typeText.cameraOffset.setTo(650,15);
		this.typeText.font = 'ZCOOL KuaiLe';
		this.typeText.fill = '#404040';
		this.typeText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.typeIcon = game.add.sprite(game.world.centerX,game.world.centerY,'noneIcon');
		this.typeIcon.scale.setTo(0.4,0.4);
		this.typeIcon.fixedToCamera = true;
		this.typeIcon.cameraOffset.setTo(650,50);

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		//Set up some instruction text on the map
		// this.ins1 = game.add.text(game.world.centerX-155, 1150, 'Change element to break blocks!', {fontSize: '15px', fill: '#DBE639'});
		// this.ins2 = game.add.text(750, 1450, 'Eat elements to change your form!', {fontSize: '15px', fill: '#DBE639'});
		// this.ins3 = game.add.text(450, 920, 'Kill enemy by bullets!', {fontSize: '15px', fill: '#DBE639'});





	},

	update: function() {
		game.physics.arcade.collide(this.player, this.wallLayer);

		game.physics.arcade.collide(this.baddie1, this.wallLayer);

		game.physics.arcade.collide(this.player.weapon.bullets, this.wallLayer, this.hitWall, null, this);

		game.physics.arcade.collide(this.player.weapon.bullets, door, this.hitWall, null, this);



		if(this.player.etype != 'fire'){
			game.physics.arcade.collide(this.player, door);
		}else{
			// game.physics.arcade.overlap(this.player, door, this.openDoor, null, this);
		}


		game.physics.arcade.overlap(this.player, fire, this.killFire, null, this);


		if(this.baddie1 != null){
			game.physics.arcade.overlap(this.baddie1.weapon1.bullets, this.player, this.hitPlayer, null, this);
			game.physics.arcade.collide(this.baddie1.weapon1.bullets, this.wallLayer, this.baddyHitWall, null, this);
		}

		game.physics.arcade.overlap(this.player.weapon.bullets, this.baddie1, this.hitBaddie, null, this);

		game.physics.arcade.overlap(this.player, ladder, this.climbLadder, null, this);

		// if(this.player.etype == null){
		// 	this.player.animations.play('normal');
		// }else if(this.player.etype == 'fire'){
		// 	this.player.animations.play('fireType');
		// }

	},
	killFire: function(){
		fire.kill();
		this.player.etype = 'fire';
		this.player.animations.stop(null,true);
		this.player.resetWeapon('fireBullet');
		this.resetType('fireIcon');

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
		}else if(this.player.currentDir == 0){
			this.baddie1.x += 20;
		}else if(this.player.currentDir == 90){
			this.baddie1.y += 20;
		}else if(this.player.currentDir == 180){
			this.baddie1.x -= 20;
		}
		if(this.baddie1.health <= 0) {
			this.baddie1.weapon1.bullets.getAt(0).kill();
			this.baddie1.kill();
			this.baddie1.statNow = false;

			this.baddie1 = null;
		}
	},

	//This function work when player was hit by baddies
	hitPlayer:function(){
		if(this.baddie1.weapon1 != null){
			this.baddie1.weapon1.bullets.getAt(0).kill();
		}
		this.player.health -= 1;
		this.health.kill();
		this.health = game.add.group();
		this.setHealth(this.player.health);

		if(this.player.health <= 0){
			this.bgmMusic.stop();
			game.state.start('GameOver');

		}
	},
	//This function work when player change its type
	resetType:function(type){
		this.typeIcon.kill();
		this.typeIcon = game.add.sprite(game.world.centerX,game.world.centerY,type);
		this.typeIcon.scale.setTo(0.4,0.4);
		this.typeIcon.fixedToCamera = true;
		this.typeIcon.cameraOffset.setTo(650,50);
	},
	climbLadder:function(){
		if(this.baddie1 == null){
			this.bgmMusic.stop();
			game.state.start('Stage1');

		}
		console.log(this.baddie1);
	},
	setHealth:function(health){
		for(var i = 0; i < health; i++){
			var hp = game.add.sprite(0,0,'aid');
			hp.scale.setTo(0.1,0.1);
			hp.fixedToCamera = true;
			hp.cameraOffset.setTo(50 + i* 25,50);
			this.health.add(hp);

		}

	},
	baddyHitWall:function(){
		if(this.baddie1.statNow != false){
			this.baddie1.weapon1.bullets.getAt(0).kill();
		}
	},
	//Debug the collision from tile map
	render:function(){
		// game.debug.body(this.baddie1);
	}


}

