//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
		score = 0;
	},

	preload: function() {
	},

	create: function() {

		//This line enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Add the music to game
		music = game.add.audio('pop');

		//The background of the game
		game.add.sprite(0, 0,'sky');

		//The platforms group contains the ground and the 2 ledges
		platforms = game.add.group();

		//Enable physics for any object that belongs to the platform
		platforms.enableBody = true;

		//Here is the ground
		var ground = platforms.create(0, game.world.height - 64, 'ground');

		//Scale the ground so that it can fit the width of the game
		ground.scale.setTo(2, 2);

		//This stops it from falling away when player jump on it;
		ground.body.immovable = true;


		//Create several ledges which players could jump on it
		var ledge = platforms.create(-200, 350, 'ground');
		ledge.body.immovable = true;

		var ledge = platforms.create(-280, 100, 'ground');
		ledge.body.immovable = true;

		var ledge = platforms.create(250, 450, 'ground');
		ledge.body.immovable = true;

		var ledge = platforms.create(300, 250, 'ground');
		ledge.body.immovable = true;

	    //Create a player and its settings
		player = game.add.sprite(32, game.world.height - 150, 'dude');

		//Physics of player
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 350;
		player.body.collideWorldBounds = true;

		//Player's left and right animation
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);

		//Create the enemy and its settings
		baddies = game.add.group();
		baddies.enableBody = true;

		baddie1 = baddies.create(200, 0, 'baddie');
		baddie2 = baddies.create(125, 0, 'baddie');
		//Physics of enemies
		baddie1.body.collideWorldBounds = true;
		baddie2.body.collideWorldBounds = true;

		//Baddies' left and right animation
		baddie1.body.gravity.y = baddie2.body.gravity.y = 350;
		baddie1.animations.add('left', [0, 1], 10, true);
		baddie1.animations.add('right', [2, 3], 10, true);
		baddie2.animations.add('left', [0, 1], 10, true);
		baddie2.animations.add('right', [2, 3], 10, true);
		
		



		//Stars to be collected by players
		stars = game.add.group();

		//Stars can be touch in the game, so enable body
		stars.enableBody = true;

		//Create 12 starts in total
		for(var i = 0; i < 10; i++){
			var star = stars.create(i * 40, 0, 'star');

			//Set gravity to each star
			star.body.gravity.y = 100;

			//Give a slightly random bounce rate to every star
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}

		//Diamond to be collected by players
		diamonds = game.add.group();

		//Diamond can be touch in the game, so enable body
		diamonds.enableBody = true;

		//Create a diamond in the air
		var diamond = diamonds.create(game.rnd.integerInRange(50,250), game.rnd.integerInRange(130,300), 'diamond');

		//Create the snow in the front end
		for(var i = 0; i < 100; ++i){
			this.snow = new Snow(game, 'snowFlake', 3, Math.PI);
			game.add.existing(this.snow);
		}

		//Score of the game
		scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();

	},

	update: function() {
		//Check the physics between player and platform
		game.physics.arcade.collide(player, platforms);

		//Check the physics between stars and platform
		game.physics.arcade.collide(stars, platforms);

		//Check the physics between enemy and platform
		game.physics.arcade.collide(baddies, platforms);

		//Check the overlap status between player and stars
		game.physics.arcade.overlap(player, stars, collectStar, null, this);

		//Check the overlap status between player and diamond
		game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

		//Check the overlap status between player and baddies
		game.physics.arcade.overlap(player, baddies, getBaddies, null, this);

		//Reset the players velocity (movement)
		player.body.velocity.x = 0;

		if(cursors.left.isDown){

			//Move to left
			player.body.velocity.x = -150;
			player.animations.play('left');
		}else if(cursors.right.isDown){

			//Move to right
			player.body.velocity.x = 150;
			player.animations.play('right');
		}else{

			//Stand Still
			player.animations.stop();
			player.frame = 4;
		}

		//Allow the player to jump if they are on the ground
		if(cursors.up.isDown && player.body.touching.down){
			player.body.velocity.y = -350;
		}

		//Set a win condition to the game
		if(score == 150){
			//After collect all stars, jump to game over state
			game.state.start('GameOver');
		}

		//Play baddies' animation
		baddie1.animations.play('left');
		baddie2.animations.play('right');


	}

}

function collectStar (player, star) {
    
    //Remove the star from the screen
    star.kill();
    music.play();
    score +=10;
    scoreText.text = 'Score: ' + score;

}
function collectDiamond(player, diamond){

	//Remove diamond from the screen
	diamond.kill();
	score += 50;
	scoreText.text = 'Score: ' + score;
}

function getBaddies(player, baddies){
	
	//Remove baddies from the screen
	baddies.kill();
	score -= 25;
	//Lose the game, jump to GameOver state
	game.state.start('GameOver');
}
