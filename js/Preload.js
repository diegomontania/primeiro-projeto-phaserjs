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
        this.load.image('creditButton', 'assets/images/menu/creditButton.png');
        this.load.image('backButton', 'assets/images/menu/backButton.png');
        this.load.image('easterEggButton', 'assets/images/menu/easterEggButton.png');
        this.load.video('video_easterEgg', 'assets/videos/video_easterEgg.mp4'); //easteregg
        this.load.audio('menu_background_music', 'assets/sounds/menu_background_music.mp3');


        //carregando os assets do jogo relacionados ao tiled
        this.load.tilemap('level1', 'assets/tiled/level1_tiledVersion1.6.json', null, Phaser.Tilemap.TILED_JSON); //carrengado mapa do tiled via json
        this.load.image('gameTiles', 'assets/images/game/tiles.png');                             //imagem tiled
        this.load.image('greenBox', 'assets/images/game/greenBox.png');                          
        this.load.image('spike', 'assets/images/game/spike.png');   

        //carregando os assets do jogo
        this.load.image('star', 'assets/images/game/star.png');
        this.load.spritesheet('dude', 'assets/images/game/dude.png', 32, 48);
        this.load.spritesheet('dude_dancing', 'assets/images/game/dude_dancing.png', 256, 256);
        this.load.image('dude_hud', 'assets/images/game/dude_hud.png');
        this.load.audio('backgroundMusic', 'assets/sounds/background_music.mp3');
        this.load.audio('starEffect', 'assets/sounds/star_effect.mp3');
        this.load.audio('jumpEffect', 'assets/sounds/jump_effect.mp3');
        this.load.audio('damageEffect', 'assets/sounds/damage_effect.ogg');
    },

    create: function(){
        //mudando de state
        this.state.start('MainMenu');
    }

}
