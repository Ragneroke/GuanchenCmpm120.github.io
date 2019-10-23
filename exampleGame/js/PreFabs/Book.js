function Book(game, x, y, key, frame, player,state,times){
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
	this.openBook = game.add.sprite(this.x,this.y,'bookOpen');
	this.openBook.anchor.setTo(0.5,0.5);
	this.openBook.scale.setTo(2,2);
	this.openBook.fixedToCamera = true;
	this.openBook.cameraOffset.setTo(400,400);
	this.openBook.alpha = 0;
	this.times = times;
	if(this.times == 'first'){
		//Set up text for instruction
		this.text1 = game.add.text(game.world.centerX, game.world.centerY,"It seems like the spirits in the portal\n are taken away by those elemental spirits. \nI have tried a lot of method to reactivate \nthem but failed…");
		this.text1.font = 'ZCOOL KuaiLe';
		this.text1.fill = '#000000'
		this.text1.fixedToCamera = true;;
		this.text1.anchor.setTo(0.5,0.5);
		this.text1.cameraOffset.setTo (400, 400);
		this.text1.alpha = 0;
	}else if(this.times == 'second'){
		//Set up text for instruction
		this.text1 = game.add.text(game.world.centerX, game.world.centerY,"This portal will send you to the other world.\nBe careful, it’s unkown.");
		this.text1.font = 'ZCOOL KuaiLe';
		this.text1.fill = '#000000'
		this.text1.fixedToCamera = true;;
		this.text1.anchor.setTo(0.5,0.5);
		this.text1.cameraOffset.setTo (400, 400);
		this.text1.alpha = 0;
	}

}

Book.prototype = Object.create(Phaser.Sprite.prototype);
Book.prototype.constructor = Book;
Book.prototype.update = function(){
	this.animations.play('stay');
	this.reading = false;
	this.openBook.alpha = 0;
	this.alpha =1;
	this.text1.alpha = 0;
	game.physics.arcade.overlap(this, this.player, this.readBook, null, this);
}

Book.prototype.readBook = function(){
	this.alpha = 0;
	this.openBook.alpha = 1;
	this.text1.alpha = 1;
}