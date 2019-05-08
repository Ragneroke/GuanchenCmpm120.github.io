//Guanchen Liu 1521926
//gliu13@ucsc.edu

//Run music is from user 'ctske' in openGameArt.org
//Animation and main character are draw by me on pixel.com
//Add a button to control the Music
var game;
var music;
window.onload = function() {
	game = new Phaser.Game(600, 700, Phaser.AUTO,'myGame');
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
}
var MainMenu = function(game){};
var Play = function(game){var player;};
var GameOver = function(game){};

function preload(){}
function create(){}
function update(){}



