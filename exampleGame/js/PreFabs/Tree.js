function Tree(game, x, y, key, frame, player){
	Phaser.Sprite.call(this,game,x,y,key,frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	this.body.immovable = true;
	this.player = player;
	this.animations.add('stay', [0,0,0,0,1,1,1,1,1], 15, true);
	this.animations.add('onFire', [2,2,3,3], 15, true);
	this.invince = false;
}

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.update = function(){
	if(this.invince != true){
		this.animations.play('stay');
	}
	if(this.player.etype != 'fire'){
		game.physics.arcade.collide(this, this.player);
	}else{
		game.physics.arcade.overlap(this, this.player, this.onFire, null, this);
	}
	game.physics.arcade.overlap(this, this.player.weapon.bullets, this.getHit, null, this);
}
Tree.prototype.onFire = function(){
	if(this.invince != true){
		this.animations.play('onFire');                            
		game.time.events.add(0, this.burn, this);
		game.time.events.add(2000, this.burnOut, this);
	}

}

Tree.prototype.burn = function(){
	this.invince = !this.invince;
}
Tree.prototype.burnOut = function(){
	this.kill();
}
Tree.prototype.getHit = function(me, bullet){
	bullet.kill();
}
// Tree.prototype.kill = function(){
// 	if(this.invince == false){
// 		this.kill();
// 		this.invince == true;
// 	}	
// }