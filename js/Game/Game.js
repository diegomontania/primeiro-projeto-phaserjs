//criando um 'namespace' para o projeto
var TheLittleGuy = TheLittleGuy || {};

TheLittleGuy.Game = function(){};

TheLittleGuy.Game.prototype = {

    //funciona como um 'start'
    create: function(){
        //variaveis do player
        this.jumpForce = 350;
        this.velocityPlayer = 150;
        this.gravityForce = 450;
        this.lifePlayer = 100;
        this.pointsPlayer = 0;
        this.pointsMax = 120;
        this.damage = 0; //inicialmente comecará com 0

        //registrando uma tecla        propriedade do phase da tecla desejada
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //adicionando background
        //              x  y  objeto
        this.add.sprite(0, 0, 'sky');

        //criando texto de pontos
        this.textPoints = this.add.text(20, 20, "Apenas Teste", {
                font: "35px Arial",
                fill: "#000000",
                align: "center"
        });
        this.textPoints.anchor.setTo(0, 0); //ancorando texto
        
        //grupo de plataformas contendo o chao onde poderemos pular
        this.platforms = this.add.group();
        this.platforms.enableBody = true; //adicionando fisica para qualquer objeto dentro desse grupo (plataforms)
        
        //criando grupo de estrelas
        this.stars = this.add.group();
        this.stars.enableBody = true;

        //criando as estrelas
        for(var i = 0; i < 12; i++){
            var star = this.stars.create (i * 70, 0, 'star');     
            star.body.gravity.y = 1 + Math.random() * 10;    //gravidade atuando randomicamente para cada estrela
            star.body.bounce.y = 0.7 + Math.random() * 0.2;  //estrelas quicando no chão randomicamente
        }

        //criando chao principal          
        //                             x            y             nome do objeto
        var ground = this.platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);      //redimencionando para que fique na parte inferior
        ground.body.immovable = true; //fazendo objeto ficar parado para que não caia quando houver colisao ao pular em cima

        //criando 'plataformas'
        var ledge;

        ledge = this.platforms.create(-150, 300, 'ground'); //plataforma 1
        ledge.body.immovable = true;

        ledge = this.platforms.create(400, 400, 'ground'); //plataforma 2
        ledge.body.immovable = true;

        //criando jogador
        this.player = this.add.sprite(32, 150, 'dude');
        this.physics.arcade.enable(this.player); //habilitando a fisica ao objeto do jogador
        this.player.body.bounce.y = 0.1;         //adicionando propriedades de fisica ao jogador (bounce vai de 0 a 1)
        this.player.body.gravity.y = this.gravityForce;
        this.player.body.collideWorldBounds = true;

        /***qualquer objeto que tenha que ter animação, deverá ser carregado como SPRITESHEET em preload()***/  
        //adicionando animações ao jogador, esquerda e direita
        //               nome animacao / todos os frames dessa animação / velocidade animação / loop sim ou não
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        //criando obstaculo
        this.spikes = this.add.group();
        this.spikes.enableBody = true;
        for(var i = 0; i < 5; i++){ //criando 'spike' a partir do grupo já instanciado com fisica
            var spike = this.spikes.create(25 * i, 505, 'spike'); 
            spike.body.immovable = true;  
        }      

        //criando e posicionando
        var barBitmapData = this.add.bitmapData(200,40);
        barBitmapData.ctx.beginPath();
        barBitmapData.ctx.rect(0,0,180,30);
        barBitmapData.ctx.fillStyle = '#31FF00';
        barBitmapData.ctx.fill();
        this.healthBar = this.add.sprite(70, 555, barBitmapData); //criando aqui
        this.healthBar.anchor.y = 0.0;
        this.add.sprite(0, 540, 'dude_hud'); //rosto do personagem

        //detectando as setas do teclado
        cursors = this.input.keyboard.createCursorKeys();  
        
        //criando os sons carregados anteriomente
        this.starEffect = this.game.add.audio('starEffect');
        this.backgroundMusic = this.game.add.audio('backgroundMusic');
        this.jummpEffect = this.game.add.audio('jumpEffect');
        this.damageEffect = this.game.add.audio('damageEffect');

        //tocando som de fundo
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
        this.backgroundMusic.play();
    },

    update: function(){
        //escrevendo e mostrando os pontos
        this.textPoints.text = "Score : " + this.pointsPlayer;

        //fazendo player andar e parar
        this.movimentPlayer();

        //fazendo player Pular
        this.jumpPlayer();

        //fazendo jogo terminar
        this.gameWin();

        //fazendo barra de vida
        this.lifeBar();

        //colidindo objetos (batendo / encostando) (estrela e chão)
        this.physics.arcade.collide(this.stars, this.platforms);
        this.physics.arcade.collide(this.player, this.spikes, this.damagePlayer, null, this);
        
        //verificando se o player está sobrepondo (passando por cima) da estrela e chamando funcao 'collectStar' que vai fazer o jogador coletar a estrela
        this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    },

    //#region METODOS PLAYER
    movimentPlayer: function(){
        if(cursors.left.isDown){
            this.player.body.velocity.x =- this.velocityPlayer;  //velocidade
            this.player.animations.play('left');            //tocando animação
        } 
        else if (cursors.right.isDown){
            this.player.body.velocity.x = this.velocityPlayer;
            this.player.animations.play('right');
        }
        else{  
            this.player.body.velocity.x = 0; //fazendo player parar, caso nenhuma tecla esteja sendo pressionada
            this.player.animations.stop();   //parando animação
            this.player.frame = 4;           //mudando o frame para 'parado' que é o frame 4
        }
    },

    jumpPlayer: function(){
        //colidindo jogador com o chão
        //                                      primeiro objeto e segundo  
        //obs : especialmente aqui, temos uma variavel para detectar se o jogador colidiu com o chão, para então habilitar o pulo
        var hitPlataform = this.physics.arcade.collide(this.player, this.platforms);     

        //se apertar o de espaço e estiver tocando no chão e em uma plataforma, pule
        if(this.spaceKey.isDown && this.player.body.touching.down && hitPlataform){
            this.player.body.velocity.y =- this.jumpForce;  
            this.jummpEffect.volume = 0.2;
            this.jummpEffect.play(); //tocando som de pulo
        }
    },

    damagePlayer: function(){
        this.damage = 10; //dano a ser recebido (temporario)
        this.lifePlayer = this.lifePlayer - this.damage;
        this.damageEffect.play();

        //evitando bug que a barra fique com valor negativo
        if(this.lifePlayer <= 0){
            this.lifePlayer = 0;
            this.player.kill();

            //chamando metodo de game over após 2 segundos da morte do little guy
            this.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);
            this.backgroundMusic.pause();
        }
    },
    //#endregion
    
    //#region METODOS DE TRANSIÇÃO DE CENAS
    gameWin: function(){
        //se fizer o máximo de pontos
        if(this.pointsPlayer >= this.pointsMax){
            this.backgroundMusic.pause();      // parando música para evitar bug de audio repetido
            this.game.state.start('GameWin'); //voltando para o menu inicial ao ganhar (provisório)
        }
    },

    gameOver: function(){
        this.game.state.start('GameOver'); //perdeu
    },
    //#endregion
    
    //#region METODOS DIVERSOS
    collectStar: function(player, star){
        //deletando objeto a ser coletado
        star.kill();
        this.starEffect.play(); //tocando efeito de som
        this.pointsPlayer = this.pointsPlayer + 10; //adicionando pontos
    },

    //barra de vida do jogador irá diminuir conforme a sua vida ou seja tomando dano
    lifeBar: function(){
        barWidth = this.healthBar.width;
        this.healthBar.width = this.lifePlayer;
        //mudar cor da barra aqui

    }
    //#endregion
}