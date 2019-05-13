//This file will create the snow function for the background

function Snow(game, key, scale, rotation) {
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0, game.width), 
		game.rnd.integerInRange(0, game.width), key);
	this.anchor.set(0.5);
	this.scale.x = 0.2;
	this.scale.y = 0.2;
	this.rotation = rotation;
	this.alpha = 0.5;
	this.flipflop = true;

	game.physics.enable(this);
	this.body.velocity.x = game.rnd.integerInRange(15,150);
	this.body.velocity.y = game.rnd.integerInRange(50,300);

	this.body.angularVelocity = game.rnd.integerInRange(-180, 180);
}

Snow.prototype = Object.create(Phaser.Sprite.prototype);
Snow.prototype.constructor = Snow;

Snow.prototype.update = function(){

	//The following if statement will change snow's x velocity so it
	//will move in a different x speed.
	if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
		if(!this.flipflop){
			this.body.velocity.x = -this.body.velocity.x;
			this.flipflop = true;
		}
	}else{
		this.flipflop = false;
	}

	if(this.body.x > game.width + 20){
		this.body.x = -20 ;
	}
	if(this.body.x < -20){
		this.body.x = game.width + 20 ;
	}

	if(this.body.y > game.height + 20){
		this.body.y = -20 ;
	}
}