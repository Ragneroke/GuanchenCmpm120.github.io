function BaddiesA(game, x, y, key, frame, player,layer,state) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Baddies = this;

	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.maxHealth = 5;
	this.player = player;
	this.scale.setTo(0.3,0.3);
	this.body.setSize(100,100,100,75);
	this.body.bounce.setTo(1,1);
	this.originX = x;
	this.originY = y;
	this.speed = 15;
	this.health = this.maxHealth;
	this.direction = 180;
	this.weapon1 = game.add.weapon(1, 'treeBullet');
	this.weapon1.bullets.type = 'bad';
	this.weapon1.bulletSpeed = 200;
	this.weapon1.trackSprite(this, 20, 20);
	this.weapon1.fireRate = 1800;
	this.statNow = true;
	this.layer = layer;
	this.state = state;

	//Set the animation of the player
	this.animations.add('stay', [0,1,2,3,4], 5, true);

	//Setup the bullet function of the player
	// this.direction = 180;
	// this.weapon = game.add.weapon(1, 'star');
	// this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	// this.weapon.bulletSpeed = 350;
	// this.weapon.trackSprite(this, 0, 0);
	// this.weapon.fireRate = 300;

	// //Setup another bullet funciton for back up
	// this.bullets = game.add.group();
	// this.bulletTime = 0;
	// this.bullets.enableBody = true;
	// this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	// this.bullets.createMultiple(30, 'star');
	// this.bullets.setAll('anchor', 0.5);
	// this.bullets.setAll('outOfBoundsKill', true);
	// this.bullets.setAll('checkWorldBounds', true);


	//Set the element type of player

	//Set the cursor for controller
	// cursors = game.input.keyboard.createCursorKeys();
	// fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	// testButton = game.input.keyboard.addKey(Phaser.KeyCode.A);


}

BaddiesA.prototype = Object.create(Phaser.Sprite.prototype);
BaddiesA.prototype.constructor = BaddiesA;
BaddiesA.prototype.update = function(){
	if(this.statNow){
		this.animations.play('stay');
		var chasing = false;

		if(Math.sqrt(Math.pow(this.player.x - this.x,2) + Math.pow(this.player.y - this.y,2)) < 300){
			if(this.player.x- 25 > this.x){
				this.body.velocity.x = this.speed;
				this.weapon1.fireAngle = 0;
			}else if(this.player.x - 25< this.x){
				this.body.velocity.x = -this.speed;
				this.weapon1.fireAngle = 180;
			}

			if(this.player.y - 25> this.y){
				this.body.velocity.y = this.speed;
				this.weapon1.fireAngle = 90;
			}else if (this.player.y - 25< this.y){
				this.body.velocity.y = -this.speed;
				this.weapon1.fireAngle = 270;
			}

			var chasing = true;
		}
		if(chasing){
			this.weapon1.fireAtSprite(this.player);
		}
		if(!this.statNow){
			this.weapon1.destroy();
		}
	}
	game.physics.arcade.collide(this, this.layer);
	game.physics.arcade.overlap(this.weapon1.bullets, this.player, this.hitPlayer, null, this);
	game.physics.arcade.collide(this.weapon1.bullets, this.layer, this.hitWall, null, this);
}
BaddiesA.prototype.hitPlayer = function(){
	if(this.weapon1 != null){
			this.weapon1.bullets.getAt(0).kill();
		}
		this.player.onHit();
		this.state.health.kill();
		this.state.health = game.add.group();
		this.state.setHealth(this.player.health);

		if(this.player.health <= 0){
			this.state.bgmMusic.stop();

		}
}
BaddiesA.prototype.render = function(){
	 game.debug.body(this);
}
BaddiesA.prototype.hitWall = function(){
	this.weapon1.bullets.getAt(0).kill();
}
