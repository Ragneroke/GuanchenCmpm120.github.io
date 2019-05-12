function Baddies(game, x, y, key, frame) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Baddies = this;
	this.anchor.set(0.5);

	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.setSize(50,50,28,35);
	this.body.collideWorldBounds = true;
	this.maxHealth = 10;

	//Set the animation of the player
	this.animations.add('run', [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,0], 30, true);

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
	this.etype = 'grass';

	//Set the cursor for controller
	// cursors = game.input.keyboard.createCursorKeys();
	// fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	// testButton = game.input.keyboard.addKey(Phaser.KeyCode.A);


}

Baddies.prototype = Object.create(Phaser.Sprite.prototype);
Baddies.prototype.constructor = Baddies;