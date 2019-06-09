Stage4.prototype = {
	init: function() {
	},

	preload: function() {


	},

	create: function() {
		stageCount = 4;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);

		//Count the total enemies in this level
		this.count = 11;
		this.leafMiddle = 2;
		this.spritBot = 3;
		this.fireUp = 3;
		this.fireLeft = 3;


		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage4');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Initial the player object
		this.player = new Players(game, 430, 3330, 'slimeAll', 1, this.wallLayer);

		//Create terrain of this level
		this.terrain = game.add.group();
		this.createWater(this.terrain,4,7,2300,1280);
		this.createLava(this.terrain,19,4,1410,3696)
		this.createTree(this.terrain,3,16,1156,3035);

		//Set the portal of this level
		this.portal1 = new Portal(game,1683,4066, 'portal', 1, this.player,1, this);
		game.add.existing(this.portal1);
		//Set player
		//Create the player
		game.add.existing(this.player);
		game.camera.follow(this.player);

		//Set up collectable element in the map
		this.water1 = new Spring(game, 750, 3280, 'waterSplash', 1, this.player);
		this.water2 = new Spring(game, 4050, 3750, 'waterSplash', 1, this.player);
		game.add.existing(this.water1);
		this.waterStatus = false;

		this.grass1 = new Grass(game,1420, 3240, 'seed', 1, this.player);
		this.grassStatus = false;

		this.fire1 = new BonFire(game,630,3230, 'bonfire', 1, this.player);
		this.fireStatus = false;
		// game.add.existing(this.grass1);


		//Create baddies in this stage
		this.enemies = game.add.group();
		this.addBaddies(this.enemies, 630, 3330,'left');
		this.addBaddies(this.enemies, 330, 3530,'left');
		this.addBaddies(this.enemies, 630, 3530,'left');
		this.addBaddies(this.enemies, 2193, 2529,'top');
		this.addBaddies(this.enemies, 1920, 2495,'top');
		this.addBaddies(this.enemies, 2293, 2529,'top');
		this.addBaddiesA(this.enemies, 1420, 3146,'middle');
		this.addBaddiesA(this.enemies, 1420, 3346,'middle');
		this.addBaddiesA(this.enemies, 4050, 3750,'bot');
		this.addBaddiesB(this.enemies, 4193, 3826, 'xMove','bot');
		this.addBaddiesB(this.enemies, 4193, 3826, 'yMove','bot');


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
		if(this.fireLeft == 0){
			if(this.fireStatus == false){
				game.add.existing(this.fire1);
				this.fireStatus == true;
			}
		}
		if(this.leafMiddle == 0){
			if(this.grassStatus == false){
				game.add.existing(this.grass1);
				this.grassStatus = true;
			}
		}
		if(this.spritBot == 0){
			if(this.waterStatus == false){
				game.add.existing(this.water2);
				this.waterStatus = true;
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
	addBaddies:function(group, x, y,condition){
		var baddy = new Baddies(game, x, y, 'fireSprite', 1, this.player, this.wallLayer, this,condition);
		game.add.existing(baddy);
		group.add(baddy);
	},
	addBaddiesA:function(group, x, y,condition){
		var baddy = new BaddiesA(game, x, y, 'leafSprite', 1, this.player, this.wallLayer, this,condition);
		game.add.existing(baddy);
		group.add(baddy);
	},
	addBaddiesB:function(group, x, y,type,condition){
		var baddy = new BaddiesB(game, x, y, 'iceSprite', 1, this.player, this.wallLayer, this, type,condition);
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
	createLava:function(group,x,y,posX,posY){
		for(var i = 0; i < y; ++i){
			for(var j = 0; j < x; ++j){
				var fir = new Lava(game, posX + j*29, posY + i*29, 'flame',1, this.player);
				game.add.existing(fir);
				group.add(fir);
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