Stage1.prototype = {
	init: function() {
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
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround1');
		this.wallLayer = this.map.createLayer('Collision1');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Setup other stuff for the game
		this.fire = game.add.sprite(750, 2300, 'bonfire');
		this.ladder = game.add.sprite(450,950, 'ladder');
		game.physics.enable([this.fire,this.ladder], Phaser.Physics.ARCADE);
		this.fire.scale.setTo(0.2);
		this.ladder.body.immovable = true;



		//Set player
		//Create the player
		this.player = new Players(game, 750, 2700, 'slimeAll', 1);
		game.add.existing(this.player);
		game.camera.follow(this.player);

		this.createWater(6,6,475,2365);

		//Create baddies in this stage
		this.enemies = game.add.group();
		this.addBaddies(this.enemies, 1300, 1900);
		this.addBaddies(this.enemies, 1400, 2000);
		this.addBaddies(this.enemies, 1500, 1950);
		this.addBaddies(this.enemies, 1600, 1800);

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
		this.healthText.fill = '#404040';
		this.healthText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.health = game.add.group();
		this.setHealth(this.player.maxHealth);


		//Setup the icon for type
		this.typeText = game.add.text(16,16, 'TYPE');
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

		//Set Instructions
		this.ins3 = game.add.text(450, 920, 'Kill all enemies to continue!!', {fontSize: '15px', fill: '#000'});




	},

	update: function() {

		game.physics.arcade.collide(this.player, this.wallLayer);

		game.physics.arcade.collide(this.enemies, this.wallLayer);

		game.physics.arcade.collide(this.enemies, this.enemies);


		game.physics.arcade.collide(this.player.weapon.bullets, this.wallLayer, this.hitWall, null, this);

		game.physics.arcade.overlap(this.player, this.fire, this.killFire, null, this);

		game.physics.arcade.overlap(this.player, this.ladder, this.climbLadder, null, this);

		game.physics.arcade.overlap(this.enemies, this.player, this.hitPlayer, null, this);

		this.player.animations.play('run');

	},
	killFire: function(){
		this.fire.kill();
		this.player.etype = 'fire';
		this.player.animations.stop(null,true);
		this.player.resetWeapon('fireBullet');
		this.resetType('fireIcon');

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
		this.player.onHit();
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
	addBaddies:function(group, x, y){
		var baddy = new Baddies(game, x, y, 'fireSprite', 1, this.player);
		game.add.existing(baddy);
		group.add(baddy);
	},
	createWater:function(x,y,posX,posY){
		for(var i = 0; i < y; ++i){
			for(var j = 0; j < x; ++j){
				var wat = new Water(game, posX + j*32, posY + i*32, 'water', 1, this.player);
				game.add.existing(wat);
			}
		}
	}


}