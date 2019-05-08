function Bullets(game, x, y, key, sprite) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.pool = 10;
	this.fireRate = 100;
	this.etype = sprite.etype;
	this.speed = 300;
	this.body.setSize(50,50,28,35);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

Bullets.prototype = Object.create(Phaser.Sprite.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.update = function(){


}
