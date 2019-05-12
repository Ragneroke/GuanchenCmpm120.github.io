function Bullets(game, x, y, key, sprite) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	//Set up the physics satus for bullets
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.pool = 10;
	this.body.immovable = true;
	this.fireRate = 100;
	this.etype = sprite.etype;
	this.speed = 200;
	this.body.setSize(10,10,28,35);
	this.outOfBoundsKill = true;
	this.checkWorldBounds = true;
	this.newBullet = true;
	this.cursors = game.input.keyboard.createCursorKeys();
	this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	this.bulletTime = 0;


}

Bullets.prototype = Object.create(Phaser.Sprite.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.update = function(){
	if(this.fireButton.isDown){
		this.fireBullet();
	}
}

Bullets.prototype.fireBullet = function(){
	
}
