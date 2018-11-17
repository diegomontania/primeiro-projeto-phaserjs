//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.Credit = function(){};

TheLittleGuy.Credit.prototype = {

    create: function(){
        var text = "Credits : \nProgramming \nDiego Alves \n\n Especial thanks to : \nPhaser Community - html5gamedevs.com\n \nHeatleyBros - fb.com/HeatleyBros (I Love this songs!) \n\nPablo Farias Navarro - gamedevacademy.org \n\nChad - perplexingtech.weebly.com \n\nArtists on - icons8.com";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);

        //botão de voltar
        this.add.button(680, 500, 'backButton', this.clickBack);

        //dancing dude
        this.dancingDude = this.add.sprite(-50, 400, 'dude_dancing');
        this.dancingDude.animations.add('dancing', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                               11, 12, 13, 14, 15, 16, 17, 18, 19, 
                                               20, 21, 22, 23, 24, 25, 26, 27, 28,
                                               29, 30, 31, 32, 33, 34, 35, 36, 37], 5, true);
    },

    update: function(){
        this.dancingDude.animations.play('dancing');
    },

    //funcao de clicar no botao e trocar de cena
    clickBack: function() {
        this.game.state.start('MainMenu');
    }
}