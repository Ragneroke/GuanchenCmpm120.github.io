//The leaf sprite Prefab
//This sprite can move any direction in a low speed 
//and shooting middle speed bullets
function BaddiesA(game, x, y, key, frame, player,layer,state,condition) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Baddies = this;

	//Setup the basic physics of baddies
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
	this.speed = 40;
	this.health = this.maxHealth;
	this.direction = 180;
	this.weapon1 = game.add.weapon(1, 'grassBullet');
	this.weapon1.bullets.type = 'bad';
	this.weapon1.bulletSpeed = 200;
	this.weapon1.trackSprite(this, 20, 20);
	this.weapon1.fireRate = 1800;
	this.statNow = true;
	this.layer = layer;
	this.state = state;
	this.hits = game.add.audio('hits');
	this.hits.volume = 0.2;
	this.hitb = game.add.audio('hitb');
	this.hitb.volume = 0.2;
	this.condition = condition;

	//Set the animation of the baddie
	this.animations.add('stay', [0,1,2,3,4], 5, true);


}

BaddiesA.prototype = Object.create(Phaser.Sprite.prototype);
BaddiesA.prototype.constructor = BaddiesA;
BaddiesA.prototype.update = function(){
	if(this.statNow){
		this.animations.play('stay');
		var chasing = false;

		if(Math.sqrt(Math.pow(this.player.x - this.x,2) + Math.pow(this.player.y - this.y,2)) < 400){
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
	game.physics.arcade.overlap(this.player.weapon.bullets, this, this.getHit, null, this);
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
BaddiesA.prototype.getHit = function(me, bullet){
	if(this.player.etype != 'water'){
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
				if(this.condition == 'middle'){
					this.state.leafMiddle -=1;
				}else if(this.condition == 'bot'){
					this.state.spritBot -= 1;
				}
				console.log(this.condition);
				this.kill();
				this.statNow = false;
		}
	}else{
			this.hitb.play();
		}
		bullet.kill();
}
