Stage1.prototype = {
	init: function() {
	},

	preload: function() {


	},

	create: function() {
		stageCount = 1;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);

		//Count the total enemies in this level
		this.count = 4;


		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage1');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround1');
		this.wallLayer = this.map.createLayer('Collision1');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Initial the player object
		this.player = new Players(game, 750, 2700, 'slimeAll', 1, this.wallLayer);

		//Create terrain of this level
		this.createWater(6,6,430,2365);

		//Set the portal of this level
		this.portal1 = new Portal(game,350,2400, 'portal', 1, this.player,1, this);
		game.add.existing(this.portal1);
		//Set player
		//Create the player
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Set up collectable element in the map
		this.fire1 = new BonFire(game,750, 2400, 'bonfire', 1, this.player);
		game.add.existing(this.fire1);

		this.grass1 = new Grass(game,1350, 2200, 'seed', 1, this.player);
		this.grassStatus = false;


		//Create baddies in this stage
		this.enemies = game.add.group();
		this.addBaddies(this.enemies, 1300, 1900);
		this.addBaddies(this.enemies, 1400, 2000);
		this.addBaddies(this.enemies, 1500, 1950);
		this.addBaddies(this.enemies, 1600, 1800);

		//Setup background music
		this.bgmMusic = game.add.audio('bgm',1,true);
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
		this.healthText.fill = '#ffffff';
		this.healthText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.health = game.add.group();
		this.setHealth(this.player.maxHealth);



		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


		//Set up a level title to this stage
		this.level = game.add.sprite(0,0,'level2');
		this.level.fixedToCamera = true;
		this.level.cameraOffset.setTo(0,0);
		this.fade = game.add.tween(this.level).to( { alpha: 0 },3000, Phaser.Easing.Linear.None, true);



	},

	update: function() { 
		game.physics.arcade.collide(this.enemies, this.enemies);
		this.portal1.count = this.count;
		if(this.count == 0){
			if(this.grassStatus == false){
				game.add.existing(this.grass1);
				this.grassStatus == false;
			}
		}
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
	addBaddies:function(group, x, y){
		var baddy = new Baddies(game, x, y, 'fireSprite', 1, this.player, this.wallLayer, this);
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