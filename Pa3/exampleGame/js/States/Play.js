//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
		score = 0;
		scoreI = 1;
		scrollSpeed = 60;
		speed = 150;
	},

	preload: function() {
	},

	create: function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Create the background and two walls of the game
		platforms = game.add.group();
		background = game.add.tileSprite(0, 0, 600, 700, "backGround");
		leftWall = game.add.tileSprite(0,0, 50, game.height, "grassLeft");
		rightWall = game.add.tileSprite(game.width-50, 0, 50, game.height, "grassRight");

		//Create the spike that appear on the top of the game
		spike = game.add.tileSprite(50,0,game.width-100,25, "spike");
		game.physics.enable([leftWall, rightWall, spike], Phaser.Physics.ARCADE);

		//Set physics
		spike.body.collideWorldBounds = true;
		leftWall.body.collideWorldBounds = true;
		rightWall.body.collideWorldBounds = true;
		spike.body.immovable = true;
		leftWall.body.immovable = true;
		rightWall.body.immovable = true;

		//Make walls and background scrolling
		leftWall.autoScroll(0, -scrollSpeed);
		rightWall.autoScroll(0, -scrollSpeed);
		background.autoScroll(0, -scrollSpeed/2);

		music = game.add.audio('runMusic', 0.1, true);

		//Setup blocks group
		this.blocksGroup = game.add.group();
		this.addBlocks(this.blocksGroup);

		//Set stars group
		// this.addBlocks(this.starsGroup);


		//Create the player
		player = game.add.sprite(game.world.centerX, game.world.centerY, 'orge',1);
		player.anchor.setTo(0.5);
		player.enableBody = true;
		game.physics.arcade.enable(player);
		player.body.setSize(50,50,28,35);
		player.body.collideWorldBounds = true;


		player.animations.add('run', [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,0], 30, true);
		if(!mute){
			music.play();
		}

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();

		//Setup difficulty timer
		this.difficultyTimer = game.time.create(false);
		this.difficultyTimer.loop(1000, this.speedUp,this);
		this.difficultyTimer.start();

		//Setup the score text
		text = game.add.text(500, 100, 'Your score: 0', {
			font: "20px Arial",
			fill: "#ff0044",
			align: "center"
		});
		text.anchor.setTo(0.5,0.5);
		

	},

	update: function() {

		//Add collide for player and blocks
		game.physics.arcade.collide(player, leftWall);

		game.physics.arcade.collide(player, rightWall);

		game.physics.arcade.collide(player, this.blocksGroup);

		game.physics.arcade.overlap(player, spike, getKilled, null, this);

		player.animations.play('run');

		if(cursors.left.isDown){

			//Move to left
			player.body.velocity.x = -180;
			if(cursors.down.isDown){
				player.body.velocity.y = 180;
			}else if (cursors.up.isDown){
				player.body.velocity.y = - 180;
			}
		}else if(cursors.right.isDown){

			//Move to right
			player.body.velocity.x = 180;
			if(cursors.down.isDown){
				player.body.velocity.y = 180;
			}else if (cursors.up.isDown){
				player.body.velocity.y = - 180;
			}
		}else if(cursors.up.isDown){

			player.body.velocity.y = - 180;
		}else if(cursors.down.isDown){

			player.body.velocity.y = 180;
		}else{
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
		}
		game.debug.body(player);


	},
	addBlocks: function(group1) {
		//Add blocks and stars frequently to the game
		var bWdith = game.rnd.integerInRange(200, 420);
		var posX = game.rnd.integerInRange(50, game.width - 50); 
		var block = new Blocks(game, scrollSpeed, bWdith, 50, posX, 'grass', 0);
		var star = new Stars(game, scrollSpeed, 'star', posX, 0);
		game.add.existing(block);
		game.add.existing(star);
		group1.add(block);


	},
	speedUp: function(){
		scrollSpeed += 3;
		score += scoreI;
		scoreI +=1;
		text.setText('Your score: ' + score);


	}

}

function getKilled (player, spike) {
    
    //Remove the star from the screen
    game.state.start('GameOver');

}
