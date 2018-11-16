TheLittleGuy.MainMenu = function(){};

TheLittleGuy.MainMenu.prototype = {

    //criando itens do menu
    create: function(){
        //colocando itens do menu
        //this.background = this.stage.backgroundColor = "#000000";
        this.add.sprite(0, 0, 'menuBackground');
        this.add.button(610, 250, 'playButton', this.clickButton);
        

        //start game text
        /*var text = "Tap to begin";
        var style = { font: "30px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);*/
    }, 

    update: function() {
      
    },

    //funcao de clicar no botao e trocar de cena
    clickButton: function() {
        this.game.state.start('Game');
    }

}