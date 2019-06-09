//Group7(Large Soda):Adventure of Slime
//Group member: Ying Luo, Guanchen Liu, Jian Wu
//Git repo:https://github.com/Ragneroke/cmpm120

var game;
var scoreText;
var baddie1;
var baddie2;
var music;
var stageCount = 0;
window.onload = function() {
	game = new Phaser.Game(800, 800, Phaser.AUTO);
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('MainMenu', MainMenu);
	game.state.add('HowToPlay', HowToPlay);
	game.state.add('Stage0', Play);
	game.state.add('Stage1', Stage1);
	game.state.add('Stage2', Stage2);
	game.state.add('Stage3', Stage3);
	game.state.add('Stage4', Stage4);
	game.state.add('Ending', Ending);
	game.state.add('GameOver', GameOver);
	game.state.start('Boot');
}
var Boot = function(game){};
var Load = function(game){};
var MainMenu = function(game){};
var HowToPlay = function(game){};
var Play = function(game){};
var Stage1 = function(game){};
var Stage2 = function(game){}
var Stage3 = function(game){}
var Stage4 = function(game){}
var Ending = function(game){}
var GameOver = function(game){};

function preload(){}
function create(){}
function update(){}



