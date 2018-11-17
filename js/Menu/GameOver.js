//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.GameOver = function(){};

TheLittleGuy.GameOver.prototype = {

    create: function(){
        var text = "Pereceu";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);

         //botão de voltar
         this.add.button(680, 500, 'backButton', this.clickBack);
    },

    update: function(){

    },

    //funcao de clicar no botao e trocar de cena
    clickBack: function() {
        this.game.state.start('MainMenu');
    }
}