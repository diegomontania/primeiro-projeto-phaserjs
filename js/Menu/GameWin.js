//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.GameWin = function(){};

TheLittleGuy.GameWin.prototype = {

    create: function(){
        var text = "Yippee Ki-Yay!";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);

        //video de easteregg
        video = this.add.video('video_easterEgg');

        //botão de voltar
        this.add.button(680, 500, 'backButton', this.clickBack);
        this.add.button(0, 0, 'easterEggButton', this.clickEasterEgg)
    },

    update: function(){

    },

    //funcao de clicar no botao e trocar de cena
    clickBack: function() {
        this.game.state.start('MainMenu');
    },

    //tocando easterEgg
    clickEasterEgg: function(){
        video.play();
        video.addToWorld(400, 300, 0.5, 0.5, 0.5, 0.5);
    }
}