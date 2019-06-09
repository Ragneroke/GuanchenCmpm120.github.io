function Treasure(game, x, y, key, frame, player,state,contain){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.scale.setTo(0.2);
	this.body.setSize(130,130,100,75);
	this.player = player;
	this.animations.add('stay', [0], 10, true);
	this.animations.add('open', [1], 10, true);
	this.collect = game.add.audio('collect');
	this.collect.volume = 0.3;
	this.state = state;
	this.contain = contain;
	this.condition = false;
}

Treasure.prototype = Object.create(Phaser.Sprite.prototype);
Treasure.prototype.constructor = Treasure;
Treasure.prototype.update = function(){
	if(!this.condition){
		game.physics.arcade.overlap(this, this.player, this.open, null, this);
		this.animations.play('stay');
	}else{
		this.animations.play('open');
	}
}

Treasure.prototype.open = function(){
		if(this.contain === 'heart'){
			this.heart1 = new Heart(game,this.x + 60, this.y, 'aid', 1, this.player, this.state);
			game.add.existing(this.heart1);
		}else if(this.contain == 'book1'){
			this.book1 = new Book(game,this.x + 60, this.y, 'book', 1, this.player, this,'first');
			game.add.existing(this.book1);
		}else if(this.contain == 'book2'){
			this.book1 = new Book(game,this.x + 60, this.y, 'book', 1, this.player, this,'second');
			game.add.existing(this.book1);
		}
		this.condition = true;

}
