//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

//instancia o phaser          tela:   x   y 
TheLittleGuy.game = new Phaser.Game (800, 600, Phaser.AUTO, '');

//adicionando todos os estados do jogo
TheLittleGuy.game.state.add('Boot', TheLittleGuy.Boot);
TheLittleGuy.game.state.add('Preload', TheLittleGuy.Preload);
TheLittleGuy.game.state.add('MainMenu', TheLittleGuy.MainMenu);
TheLittleGuy.game.state.add('Game', TheLittleGuy.Game);

//muda para o estado de boot
TheLittleGuy.game.state.start('Boot');