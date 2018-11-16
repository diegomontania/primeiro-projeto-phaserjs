//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.Boot = function(){};

//fazendo configurações diversas do jogo
TheLittleGuy.Boot.prototype = {

    //carregando assets utilizados para a tela de loading
    preload : function(){
        this.load.image('logo', 'assets/images/menu/logo.png');
        this.load.image('preloadbar', 'assets/images/menu/preloader-bar.png');
    },

    //aqui serão feitas configurações diversas antes do preload do jogo
    create : function(){
        //fundo preto de loading
        this.game.stage.backgroundColor = '#000000'

        //centralizando o jogo horizontalmente quando chegar a tela de menu
        //this.scale.pageAlignHorizontally = true;

        //física do jogo
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //mudando de state
        this.state.start('Preload');
    }
}