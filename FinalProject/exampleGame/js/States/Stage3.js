Stage3.prototype = {
	init: function() {
	},

	preload: function() {


	},

	create: function() {
		stageCount += 1;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);

		//Count the total enemies in this level
		this.count = 4;


		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage3');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Initial the player object
		this.player = new Players(game, 1825, 1450, 'slimeAll', 1, this.wallLayer);

		//Create terrain of this level
		this.terrain = game.add.group();
		this.createWater(this.terrain,4,7,2300,1280);
		this.createTree(this.terrain,9,3,1830,1100);

		//Set the portal of this level
		this.portal1 = new Portal(game,2575,1330, 'portal', 1, this.player,1, this);
		game.add.existing(this.portal1);
		//Set player
		//Create the player
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Set up collectable element in the map
		this.water1 = new Spring(game,1790, 1350, 'waterSplash', 1, this.player);
		game.add.existing(this.water1);

		this.grass1 = new Grass(game,1962, 985, 'seed', 1, this.player);
		this.grassStatus = false;

		this.treasure1 = new Treasure(game,1900, 951, 'treasure', 1, this.player, this, 'book1');
		game.add.existing(this.treasure1);



		this.fire1 = new BonFire(game,1181,1265, 'bonfire', 1, this.player);
		this.fireStatus = false;
		// game.add.existing(this.grass1);


		//Create baddies in this stage
		this.enemies = game.add.group();
		this.addBaddies(this.enemies, 1940, 951);
		this.addBaddies(this.enemies, 1970, 951);
		this.addBaddiesA(this.enemies, 2600, 1300);
		this.addBaddiesB(this.enemies, 1050, 1306);


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
		this.fade = game.add.tween(this.level).to( { alpha: 0 },2000, Phaser.Easing.Linear.None, true);



	},

	update: function() { 
		game.physics.arcade.collide(this.enemies, this.enemies);
		this.portal1.count = this.count;
		if(this.count == 3){
			if(this.fireStatus == false){
				game.add.existing(this.fire1);
				this.fireStatus == true;
			}
		}else if(this.count == 1){
			if(this.grassStatus == false){
				game.add.existing(this.grass1);
				this.grassStatus = true;
			}
		}
		game.physics.arcade.collide(this.enemies, this.terrain);
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
	addBaddiesA:function(group, x, y){
		var baddy = new BaddiesA(game, x, y, 'leafSprite', 1, this.player, this.wallLayer, this);
		game.add.existing(baddy);
		group.add(baddy);
	},
	addBaddiesB:function(group, x, y){
		var baddy = new BaddiesB(game, x, y, 'iceSprite', 1, this.player, this.wallLayer, this, 'yMove');
		game.add.existing(baddy);
		group.add(baddy);
	},
	createWater:function(group,x,y,posX,posY){
		for(var i = 0; i < y; ++i){
			for(var j = 0; j < x; ++j){
				var wat = new Water(game, posX + j*32, posY + i*32, 'water', 1, this.player);
				game.add.existing(wat);
				group.add(wat);
			}
		}
	},
	createTree:function(group,x,y,posX,posY){
		for(var i = 0; i < y; ++i){
			for(var j = 0; j < x; ++j){
				var tree = new Tree(game, posX + j*32, posY + i*32, 'tree', 1, this.player);
				game.add.existing(tree);
				group.add(tree);
			}
		}
	}


}