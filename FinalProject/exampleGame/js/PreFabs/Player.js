function Players(game, x, y, key, frame) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Player = this;
	this.anchor.set(0.5);

	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.setSize(50,50,28,35);
	this.body.collideWorldBounds = true;

	//Set the animation of the player
	this.animations.add('run', [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,0], 30, true);

	//Setup the bullet function of the player
	this.direction = 180;
	this.weapon = game.add.weapon(5, 'star');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.bulletSpeed = 350;
	this.weapon.trackSprite(this, 0, 0);
	this.weapon.fireRate = 300;

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
	if(cursors.left.isDown){

			//Move to left
			this.body.velocity.x = -180;
			if(cursors.down.isDown){
				this.body.velocity.y = 180;
			}else if (cursors.up.isDown){
				this.body.velocity.y = - 180;
			}
			this.weapon.fireAngle = 180;
		}else if(cursors.right.isDown){

			//Move to right
			this.body.velocity.x = 180;
			if(cursors.down.isDown){
				this.body.velocity.y = 180;
			}else if (cursors.up.isDown){
				this.body.velocity.y = - 180;
			}
			this.weapon.fireAngle = 0;
		}else if(cursors.up.isDown){

			this.body.velocity.y = - 180;
			this.weapon.fireAngle = 270;
		}else if(cursors.down.isDown){

			this.body.velocity.y = 180;
			this.weapon.fireAngle = 90;
		}else{
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
		if(fireButton.isDown){
			//Fire the Weapon
			this.weapon.fire();
		}
		game.debug.body(this);
		game.debug.spriteInfo(this,32,32);
		if(testButton.isDown){
			console.log(this.etype);
		}

}