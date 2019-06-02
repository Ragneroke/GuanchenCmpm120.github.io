function Players(game, x, y, key, frame) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Player = this;
	this.anchor.set(0.5);
	this.scale.setTo(0.2,0.2);


	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.setSize(100,100,100,100);
	this.body.collideWorldBounds = true;
	this.maxHealth = 5;
	this.health = this.maxHealth;


	//Set the animation of the player
	this.animations.add('normal', [7,0,1,2,3,4,5,6], 10, true);
	this.animations.add('normalStay', [8,8,8,9,9,9], 5, true);
	this.animations.add('fireType', [17,10,11,12,13,14,15,16], 10, true);
	this.animations.add('waterType', [27,20,21,22,23,24,25,26], 10, true);
	this.animations.add('grassType', [37,30,31,32,33,34,35,36], 10, true);

	//Setup the bullet function of the player
	this.direction = 180;
	this.weapon = game.add.weapon(1, 'star');
	this.weapon.bullets.type = 'good';
	this.weapon.bulletSpeed = 350;
	this.weapon.trackSprite(this, 0, 0);
	this.weapon.fireRate = 1000;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	this.move = false;
	this.bulletPos = 0;

	// //Setup another bullet funciton for back up
	// this.bullets = game.add.group();
	// this.bulletTime = 0;
	// this.bullets.enableBody = true;
	// this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	// this.bullets.createMultiple(30, 'star');
	// this.bullets.setAll('anchor', 0.5);
	// this.bullets.setAll('outOfBoundsKill', true);
	// this.bullets.setAll('checkWorldBounds', true);


	//Set music for player
	this.shot = game.add.audio('pop');
	this.shot.volume = 0.3;
	//Set the element type of player
	this.etype = null;

	//Set the cursor for controller
	cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	testButton = game.input.keyboard.addKey(Phaser.KeyCode.A);


}

Players.prototype = Object.create(Phaser.Sprite.prototype);
Players.prototype.constructor = Players;

Players.prototype.update = function(){
	this.move = false;
	game.debug.body(this);
	if(cursors.left.isDown){

			//Move to left
			this.body.velocity.x = -130;
			this.weapon.fireAngle = 180;
			this.body.velocity.y = 0;
			this.move = true;
		}
		if(cursors.right.isDown){

			//Move to right
			this.body.velocity.x = 130;

			this.weapon.fireAngle = 0;
			this.body.velocity.y = 0;
			this.move = true;
		}
		if(cursors.up.isDown){

			this.body.velocity.y = - 130;
			this.weapon.fireAngle = 270;
			this.body.velocity.x = 0;
			this.move = true;
		}
		if(cursors.down.isDown){


			this.body.velocity.y = 130;
			this.weapon.fireAngle = 90;
			this.body.velocity.x = 0;
			this.move = true;
		}
		if(!this.move){
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
		if(fireButton.isDown){
			//Fire the Weapon
			this.weapon.fire();
			this.currentDir = this.weapon.fireAngle;
			this.shot.play();
			// if(this.weapon.bullets.getAt(0) != )
		}

		if(this.etype == null){
			if(this.move == true){
				this.animations.play('normal');
			}else{
				this.animations.play('normalStay');
			}
		}else if(this.etype == 'fire'){
			this.animations.play('fireType');
		}


}
Players.prototype.resetWeapon = function(type){
	//This function will destroy the previous weapon
	//and setup a new one when player collect elements
	this.weapon.destroy();
	this.weapon = game.add.weapon(1, type);
	this.weapon.bulletSpeed = 350;
	this.weapon.trackSprite(this, 0, 0);
	this.weapon.fireRate = 1000;
}
