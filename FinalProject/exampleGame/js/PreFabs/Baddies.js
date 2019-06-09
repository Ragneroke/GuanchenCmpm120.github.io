function Baddies(game, x, y, key, frame, player,layer,state,condition) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Baddies = this;

	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.maxHealth = 5;
	this.player = player;
	this.scale.setTo(0.2,0.2);
	this.body.setSize(125,125,90,100);
	this.originX = x;
	this.originY = y;
	this.speed = 80;
	this.health = this.maxHealth;
	this.statNow = true;
	this.state = state;
	this.layer = layer;
	this.hits = game.add.audio('hits');
	this.hits.volume = 0.2;
	this.hitb = game.add.audio('hitb');
	this.hitb.volume = 0.2;
	this.condition = condition;


	//Set the animation of the player
	this.animations.add('stay', [0,1,2,3,4,5,6,7], 10, true);

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

Baddies.prototype = Object.create(Phaser.Sprite.prototype);
Baddies.prototype.constructor = Baddies;
Baddies.prototype.update = function(){
	if(this.statNow){
	this.animations.play('stay');
	var chasing = false;

	if(Math.sqrt(Math.pow(this.player.x - this.x,2) + Math.pow(this.player.y - this.y,2)) < 300){
		if(this.player.x - 25 > this.x){
			this.body.velocity.x = this.speed;
		}else if(this.player.x - 25 < this.x){
			this.body.velocity.x = -this.speed;
		}

		if(this.player.y - 25 > this.y){
			this.body.velocity.y = this.speed;
		}else if (this.player.y - 25 < this.y){
			this.body.velocity.y = -this.speed;
		}
		var chasing = true;
	}
	game.physics.arcade.overlap(this.player.weapon.bullets, this, this.getHit, null, this);
	}
	game.physics.arcade.overlap(this, this.player, this.hitPlayer, null, this);
	game.physics.arcade.collide(this, this.layer);
}

Baddies.prototype.getHit = function(me, bullet){
	

	if(this.player.etype != 'grass'){
		this.hits.play();
		this.health -= 1;
		console.log(bullet.angle);
		if(bullet.angle == -90){
				this.y -= 20;
				// game.physics.arcade.collide(this, this.layer, this.stayOffWallUp);
			}else if(bullet.angle == 0){
				this.x +=20;
			}else if(bullet.angle == 90){
				this.y +=20;
			}else if(bullet.angle == -180){
				this.x -=20;
			}
			if(this.health <= 0) {
				this.state.count -= 1;
				if(this.condition == 'left'){
					this.state.fireLeft -=1;
				}else if(this.condition == 'top'){
					this.state.fireUp -= 1;
				}
				this.kill();
				this.statNow = false;
		}
	}else{
			this.hitb.play();
		}
		bullet.kill();
}

Baddies.prototype.stayOffWallUp = function(){
	this.y += 1;
	game.physics.arcade.collide(this, this.layer, this.stayOffWallUp);
}

Baddies.prototype.hitPlayer = function(){
	this.player.onHit();
	this.state.health.kill();
	this.state.health = game.add.group();
	this.state.setHealth(this.player.health);
	if(this.player.health <= 0){
			this.state.bgmMusic.stop();

		}

}