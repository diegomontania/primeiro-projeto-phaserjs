//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.Preload = function(){};

TheLittleGuy.Preload.prototype = {

    preload : function(){
        //mostrando logo na tela de carregamento e ancorando
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //carregando os assets do menu
        this.load.image('menuBackground', 'assets/images/menu/menu.png');
        this.load.image('playButton', 'assets/images/menu/playButton.png');

        //carregando os assets do jogo
        this.load.image('sky', 'assets/images/game/sky.png');
        this.load.image('ground', 'assets/images/game/platform.png');
        this.load.image('star', 'assets/images/game/star.png');
        this.load.spritesheet('dude', 'assets/images/game/dude.png', 32, 48);
        this.load.image('dude_hud', 'assets/images/game/dude_hud.png');
        this.load.image('spike', 'assets/images/game/spike.png');
        this.load.audio('backgroundMusic', 'assets/sounds/background_music.mp3');
        this.load.audio('starEffect', 'assets/sounds/star_effect.mp3');
        this.load.audio('jumpEffect', 'assets/sounds/jump_effect.mp3');
    },

    create: function(){
        //mudando de state
        this.state.start('MainMenu');
    }

}
