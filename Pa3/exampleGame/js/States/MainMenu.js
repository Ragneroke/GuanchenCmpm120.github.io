//Following is the main menu state	
// //Main menu state will only appear when player enter the game for first time
var button;
MainMenu.prototype = {
	init: function() {
		mute = false;
	},
	preload: function(){
		game.load.image('star', 'assets/img/star.png');
		game.load.image('grass', 'assets/img/grass.png');
		game.load.image('grassLeft', 'assets/img/grassLeft.png');
		game.load.image('grassRight', 'assets/img/grassRight.png');
		game.load.image('backGround', 'assets/img/BackGround.png');
		game.load.image('spike', 'assets/img/Spike.png');
		game.load.spritesheet('speaker', 'assets/img/Speaker.png',512,512);
		game.load.spritesheet('baddie', 'assets/img/baddie.png',32,32);
		game.load.atlas('orge', 'assets/img/mainCharacter.png', 'assets/img/mainCharacter.json');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.audio('runMusic', 'assets/audio/runMusic.ogg');
		game.stage.backgroundColor = "#facade";

	},
	create: function(){
		//Add a short intro for the game
		mute = false;
		var menuText = game.add.text(game.world.centerX, 100, 'Unstoppable Orga Itsuka\nAvoid the spike from top of the game\nUse Arrow Key to move\nPress [Space] to Start', {fontSize: '32px', fill: '#000', boundsAlignH: "center", boundsAlignV: "middle"});
		button = game.add.button(game.world.centerX , 400, 'speaker', actionOnClick, this, 1, 1, 1, 1);
		musicState = game.add.text(game.world.centerX , 500, 'Audio: On');
		menuText.anchor.setTo(0.5);
		musicState.anchor.setTo(0.5);
		button.anchor.setTo(0.5);
		button.scale.setTo(0.1);
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('Play');
		}
		if(mute == false){
			musicState.setText("Audio: On");
		}else{
			musicState.setText("Audio: Off");
		}
	}
}
function actionOnClick(){
		mute = !mute;
	
}