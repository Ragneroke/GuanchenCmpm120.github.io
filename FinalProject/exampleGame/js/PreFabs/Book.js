function Book(game, x, y, key, frame, player,state){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.1);
	this.body.setSize(130,130,100,75);
	this.player = player;
	this.animations.add('stay', [0], 10, true);
	this.collect = game.add.audio('collect');
	this.collect.volume = 0.3;
	this.state = state;
	this.reading = false;
}

Book.prototype = Object.create(Phaser.Sprite.prototype);
Book.prototype.constructor = Book;
Book.prototype.update = function(){
	this.reading = false;
	game.physics.arcade.overlap(this, this.player, this.readBook, null, this);
	this.animations.play('stay');
}

Book.prototype.readBook = function(){
	if(this.reading == true){
		this.openBook = game.add.sprite(this.x,this.y,'openBook');
		this.openBook.anchor.setTo(0.5,0.5);
		this.openBook.fixedToCamera = true;
		this.openBook.cameraOffset.setTo(400,400);

	}
}