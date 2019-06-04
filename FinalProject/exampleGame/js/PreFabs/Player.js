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
	this.animations.add('normal', 				[7,0,1,2,3,4,5,6], 10, true);
	this.animations.add('normalStay', 			[8,8,8,9,9,9], 5, true);
	this.animations.add('normalD', 				[40,41,42,41],5, true);
	this.animations.add('normalDStay', 			[40,43,44,44,44,45,45,45,44,44,44,45,45,44,44,44,43,40,40,40,40,40,40,40], 5, true);

	this.animations.add('fireType', 			[17,10,11,12,13,14,15,16], 10, true);
	this.animations.add('fireStay',				[18,18,18,19,19,19], 5, true);
	this.animations.add('fireD', 				[46,47,48,47],5, true);// fire down
	this.animations.add('fireDStay', 			[46,49,50,50,50,51,51,51,50,50,50,51,51,50,50,50,49,46,46,46,46,46,46,46], 5, true);// fire down stay

	this.animations.add('waterType', 			[27,20,21,22,23,24,25,26], 10, true);
	this.animations.add('waterStay', 			[28,28,28,29,29,29], 5, true);// water stay
	this.animations.add('waterD', 				[52,53,54,53],5, true);// water down
	this.animations.add('waterDStay',			[52,55,56,56,56,57,57,57,56,56,56,57,57,56,56,56,55,52,52,52,52,52,52,52], 5, true);// water stay

	this.animations.add('grassType', 			[37,30,31,32,33,34,35,36], 10, true);
	this.animations.add('grassStay', 			[38,38,38,39,39,39], 5, true);// grass stay
	this.animations.add('grassD', 				[58,59,60,59],5, true);// grass down
	this.animations.add('grassStay', 			[58,61,62,62,62,63,63,63,62,62,62,63,63,62,62,62,61,58,58,58,58,58,58,58], 5, true);// grass stay
	//This tween will work when player get hit and set into invicible
	this.flash = game.add.tween(this).to( { alpha: 0 },100, Phaser.Easing.Linear.None, true, 0, 1000, true);
	this.flash.pause();
	//Setup the bullet function of the player
	this.direction = 180;
	this.weapon = game.add.weapon(0, 'star');
	this.weapon.bullets.type = 'good';
	this.weapon.bulletSpeed = 350;
	this.weapon.trackSprite(this, 0, 0);
	this.weapon.fireRate = 1000;
	this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	this.move = false;
	this.bulletPos = 0;
	this.invicible = false;

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
	this.etype = 'none';

	//Set the cursor for controller
	cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	testButton = game.input.keyboard.addKey(Phaser.KeyCode.A);


}

Players.prototype = Object.create(Phaser.Sprite.prototype);
Players.prototype.constructor = Players;

Players.prototype.update = function(){
	if(this.invicible){
		this.flash.resume();

	}else{
		this.flash.pause();
		this.alpha = 1;
	}
	this.move = false;
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

		if(this.etype == 'none'){
			if(this.move == true){
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('normal');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('normalD');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('normalD');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('normal');
				}
			}else{
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('normalStay');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('normalDStay');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('normalDStay');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('normalStay');
				}

			}
		}else if(this.etype == 'fire'){
			if(this.move == true){
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('fireType');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('fireD');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('fireD');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('fireType');
				}
			}else{
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('fireStay');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('fireDStay');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('fireDStay');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('fireStay');
				}
			}

		}else if(this.etype == 'grass'){
			if(this.move == true){
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('grassType');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('grassD');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('grassD');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('grassType');
				}
			}else{
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('grassStay');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('grassDStay');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('grassDStay');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('grassStay');
				}
			}

		}else if(this.etype == 'water'){
			if(this.move == true){
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('waterType');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('waterD');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('waterD');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('waterType');
				}
			}else{
				if(this.weapon.fireAngle == 180){
					this.scale.setTo(-0.2,0.2);
					this.animations.play('waterStay');
				}else if(this.weapon.fireAngle == 90){
					this.scale.setTo(0.2,0.2);
					this.animations.play('waterDStay');
				}else if(this.weapon.fireAngle == 270){
					this.scale.setTo(0.2,-0.2);
					this.animations.play('waterDStay');
				}else {
					this.scale.setTo(0.2,0.2);
					this.animations.play('waterStay');
				}
			}

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

Players.prototype.onHit = function(){
	if(!this.invicible){
		console.log('ec');
		game.time.events.add(0, this.toggleInvincible, this);
		this.health -= 1;
		// this.flash.resume();
		game.time.events.add(2000, this.toggleInvincible, this);
		// this.flash.pause();
	}
}

Players.prototype.toggleInvincible = function(){
	this.invicible = !this.invicible;

	console.log(this.invicible);
}

