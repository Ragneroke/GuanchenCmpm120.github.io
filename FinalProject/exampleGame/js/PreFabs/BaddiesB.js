function BaddiesB(game, x, y, key, frame, player,layer,state,moveType) {

	Phaser.Sprite.call(this,game,x,y,key,frame);
	var _Baddies = this;

	//Setup the basic physics of players
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.maxHealth = 5;
	this.player = player;
	this.scale.setTo(0.25,0.25);
	this.body.setSize(150,150,80,75);
	this.body.bounce.setTo(1,1);
	this.originX = x;
	this.originY = y;
	this.speed = 35;
	this.health = this.maxHealth;
	this.direction = 180;
	this.weapon1 = game.add.weapon(1, 'waterBullet');
	this.weapon1.bullets.type = 'bad';
	this.weapon1.bulletSpeed = 300;
	this.weapon1.trackSprite(this, 20, 20);
	this.weapon1.fireRate = 1800;
	this.statNow = true;
	this.layer = layer;
	this.state = state;
	this.moveType = moveType;
	this.hits = game.add.audio('hits');
	this.hits.volume = 0.2;
	this.hitb = game.add.audio('hitb');
	this.hitb.volume = 0.2;

	//Set the animation of the player
	this.animations.add('stay', [0,0,1,1], 5, true);
}

BaddiesB.prototype = Object.create(Phaser.Sprite.prototype);
BaddiesB.prototype.constructor = BaddiesB;
BaddiesB.prototype.update = function(){
	if(this.statNow){
		this.animations.play('stay');
		var chasing = true;
		if(this.moveType == 'xMove'){
			this.body.velocity.x = this.speed;
		}else if (this.moveType == 'yMove'){
			this.body.velocity.y = this.speed;
		}
		
		if(chasing){
			this.weapon1.fireAtSprite(this.player);
		}
		if(!this.statNow){
			this.weapon1.destroy();
		}
		if(game.physics.arcade.collide(this, this.layer)){
			this.speed = -this.speed;
		}
	}
	game.physics.arcade.collide(this, this.layer);
	game.physics.arcade.overlap(this.weapon1.bullets, this.player, this.hitPlayer, null, this);
	game.physics.arcade.collide(this.weapon1.bullets, this.layer, this.hitWall, null, this);
	game.physics.arcade.overlap(this.player.weapon.bullets, this, this.getHit, null, this);
}
BaddiesB.prototype.hitPlayer = function(){
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
BaddiesB.prototype.render = function(){
	 game.debug.body(this);
}
BaddiesB.prototype.hitWall = function(){
	this.weapon1.bullets.getAt(0).kill();
}
BaddiesB.prototype.getHit = function(){
	this.player.weapon.bullets.getAt(0).kill();
	if(this.player.etype != 'fire'){
		this.hits.play();
		this.health -= 1;
		if(this.player.currentDir == 270){
				this.y -= 20;
			}else if(this.player.currentDir == 0){
				this.x +=20;
			}else if(this.player.currentDir == 90){
				this.y +=20;
			}else if(this.player.currentDir == 180){
				this.x -=20;
			}
			if(this.health <= 0) {
				this.state.count -= 1;
				this.kill();
				this.statNow = false;
		}
	}else{
			this.hitb.play();
		}
}