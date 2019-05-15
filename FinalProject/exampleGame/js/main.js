//Group7(Large Soda):Adventure of Slime
//Group member: Ying Luo, Guanchen Liu, Jian Wu
//Git repo:https://github.com/Ragneroke/cmpm120

var game;
var scoreText;
var baddie1;
var baddie2;
var music;
window.onload = function() {
	game = new Phaser.Game(600, 600, Phaser.AUTO);
	game.state.add('MainMenu', MainMenu);
	game.state.add('testStage', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
}
var MainMenu = function(game){};
var Play = function(game){};
var GameOver = function(game){};

function preload(){}
function create(){}
function update(){}



