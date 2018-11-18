//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.MainMenu = function(){};

TheLittleGuy.MainMenu.prototype = {

    //criando itens do menu
    create: function(){
        //colocando itens do menu
        //this.background = this.stage.backgroundColor = "#000000";
        this.add.sprite(0, 0, 'menuBackground');
        this.add.button(650, 445, 'playButton', this.clickPlay);
        this.add.button(550, 450, 'creditButton', this.clickCredit);

        //criando som do menu
        this.backgroundMusic = this.game.add.audio('menu_background_music');
        this.backgroundMusic.volume = 0.4;
        //this.backgroundMusic.play(); ainda com problemas
    }, 

    update: function() {
        
    },

    //funcao de clicar no botao e trocar de cena
    clickPlay: function() {
        //this.backgroundMusic.pause(); //parando musica de menu ao começar o jogo ainda com problemas
        this.game.state.start('Game');
    },

    clickCredit: function() {
        this.game.state.start('Credit');
    }
}