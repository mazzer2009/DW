class PlayState extends Phaser.State {
    preload() {
        let dir = Config.ASSETS;
        // mapa
        this.game.load.tilemap('level1', `${dir}level${Config.LEVEL}.json`,
                null, Phaser.Tilemap.TILED_JSON);
        //this.game.load.tilemap('level1', `${dir}mapacerto.json`, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('mario', `${dir}mario.png`);
        this.game.load.spritesheet('dude', `${dir}mariodude.png`, 21, 35);
        this.game.load.image('background', `${dir}background${Config.LEVEL}.png`);
        this.game.load.image('background1_z0', `${dir}background2_z0.png`);
        this.game.load.spritesheet('coin', `${dir}coins2.png`, 16, 17);
        this.game.load.spritesheet('nuvem', `${dir}check.png`, 18, 18);
        this.game.load.spritesheet('planta', `${dir}planta.png`, 18, 18);
        this.game.load.spritesheet('vida', `${dir}vida.png`, 16, 16);
        this.game.load.spritesheet('canhao', `${dir}canhao.png`, 16, 16);
        this.game.load.spritesheet('bala', `${dir}bala.png`, 21, 20);
        this.game.load.spritesheet('lava', `${dir}lava.png`, 16, 16);
        this.game.load.spritesheet('nextlevel', `${dir}nextlevel.png`, 24, 24);
        this.game.load.spritesheet('voador', `${dir}enemynuvem.png`, 28, 38);
        this.game.load.spritesheet('tartaruga', `${dir}tartaruga.png`, 18, 16);
        this.game.load.spritesheet('planta_horizontal', `${dir}planta_horizontal_33x16.png`, 33, 16);

        this.game.load.image('trophy', `${dir}trophy-200x64.png`);

        setInterval(function () {
            ServerComm.ajaxPost({}, function () {});
        }, 1000);
    }

    createPlayer() {
        if (Config.LEVEL == 2) {
            this.player = new Player(this.game, this.keys, 121, 3150, 'dude');
            console.log("level 2")
        } else {
            this.player = new Player(this.game, this.keys, 5, 5, 'dude');
        }
        // this.player = new Player(this.game, this.keys, 5, 5, 'dude');
        this.game.add.existing(this.player);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    createMap() {
        // chave para o arquivo .json carregado no metodo preload()
        this.map = this.game.add.tilemap('level1');
        // chave para o arquivo .png de tileset carregado no metodo preload()
        // corresponde ao nome usado para o tileset dentro do Tiled Editor
        this.map.addTilesetImage('mario');

        // deve ter o mesmo nome usado na camada criada no Tiled Editor
        this.mapLayer = this.map.createLayer('Camada de Tiles 1');


        // os indices sao os mesmos para o tiles no Tiled Editor, acrescidos em 1
        this.map.setCollisionBetween(886, 888, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(940, 942, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(994, 996, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(241, 242, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(295, 296, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(581, 583, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(1043, 1045, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(784, 785, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(838, 838, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(1032, 1032, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(393, 393, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(1255, 1260, true, 'Camada de Tiles 1');
        this.map.setCollisionBetween(1311, 1313, true, 'Camada de Tiles 1');
        this.mapLayer.resizeWorld();

        this.trapsLayer = this.map.createLayer('Traps');
        this.map.setCollision([829], true, 'Traps');
        this.map.setCollision([830], true, 'Traps');
        this.map.setCollision([771, 825, 879, 710], true, 'Traps');
        //this.map.setCollision([1369],true, "Canhao");
    }

    createCoins() {
        this.coins = this.game.add.group();
        this.map.createFromObjects('Coins', 1351, 'coin', 0, true, false, this.coins, Coin);
    }
    createPlanta() {
        this.planta = this.game.add.group();
        this.map.createFromObjects('Inimigos', 1358, 'planta', 0, true, false, this.planta, Planta);
    }

    createCanhao() {
        this.canhoes = this.game.add.group();
        this.map.createFromObjects('Canhao', 1369, 'canhao', 0, true, false, this.canhoes, Canhao);
        this.balas = this.game.add.group();
        this.canhoes.forEach((canhao) => canhao.balas = this.balas)
    }

    createLava() {
        this.lava = this.game.add.group();
        this.map.createFromObjects('Lava', 1361, 'lava', 0, true, false, this.lava, Lava);
    }

    createChecks() {
        this.checks = this.game.add.group();
        this.map.createFromObjects('Coins', 1355, 'nuvem', 0, true, false, this.checks, Nuvem);
    }

    createVida() {
        this.vidas = this.game.add.group();
        this.map.createFromObjects('Coins', 1357, 'vida', 0, true, false, this.vidas, Vida);
    }

    createNextlevel() {
        this.nextlevel = this.game.add.group();
        this.map.createFromObjects('Next level', 1368, 'nextlevel', 0, true, false, this.nextlevel, Nextlevel);
    }

    createEnemies() {
        this.voadores = this.game.add.group();
        this.map.createFromObjects('Inimigos', 1365, 'voador', 0, true, false, this.voadores, Voador);
        this.voadores.forEach((voador) => voador.start())

        this.bixos = this.game.add.group();
         this.map.createFromObjects('Inimigos', 1369, 'tartaruga', 0, true, false, this.bixos, Tartaruga);
         this.bixos.forEach( (tartaruga) => tartaruga.start())

         this.planta_horizontal=this.game.add.group();
         this.map.createFromObjects('Inimigos', 1371, 'planta_horizontal', 0, true, false, this.planta_horizontal, PlantaHorizontal);
         this.planta_horizontal.forEach( (planta_horizontal) => planta_horizontal.start())
    }

    cretateHud() {
        this.infoScore = this.game.add.text(16, 16, '', {fontSize: "16px", fill: '#ffffff'});
        this.infoScore.text = "COINS: 0";
        this.infoScore.fixedToCamera = true;

        this.infoVidas = this.game.add.text(16, 37, '', {fontSize: "16px", fill: '#ffffff'});
        this.infoVidas.text = "Vidas:" + Config.VIDAS;
        this.infoVidas.fixedToCamera = true

        this.pause = this.game.add.text(230, 175, '', {fontSize: "36px", fill: '#ff0000'});
        this.pause.text = "";
        this.pause.fixedToCamera = true
    }

    addScore(amount) {
        this.score += amount;
        this.infoScore.text = "COINS: " + this.score;
    }

    addVida(amount) {
        this.vidasTotal += amount;
        this.infoVidas.text = "Vidas: " + this.vidasTotal;
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#000000';

        // let bg = this.game.add.tileSprite(0, 0, Config.WIDTH, Config.HEIGHT, 'background');
        this.bg2 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background1_z0');
        //bg.tileScale.setTo(this.game.width/bg.width, this.game.height/bg.height);
        this.bg2.tileScale.setTo(0.5, 0.5);
        this.bg2.fixedToCamera = true;
        this.bg2.tint = 0x222222

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        //bg.tileScale.setTo(this.game.width/bg.width, this.game.height/bg.height);
        this.bg.tileScale.setTo(1.2, 1.2);
        this.bg.fixedToCamera = true;



        this.keys = this.game.input.keyboard.createCursorKeys();
        this.game.physics.arcade.gravity.y = 550;
        this.score = 0;
        this.vidasTotal = 3;

        let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        fullScreenButton.onDown.add(this.toogleFullScreen, this);

        let screenshotButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        screenshotButton.onDown.add(this.takeScreenShot, this);


        let pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        pauseButton.onDown.add(this.pauseGame, this);

        this.createMap();
        this.createCoins();
        this.createPlayer();
        this.createPlanta();
        this.createLava();
        //this.createBala();
        this.createCanhao();
        this.createVida();
        this.createEnemies();
        this.camadaEsconde = this.map.createLayer('Camada esconde');
        this.createChecks();
        this.createNextlevel();
        this.cretateHud();
        this.trophy = new Trophy(this.game);
        this.game.add.existing(this.trophy);
        this.levelCleared = false

    }

    pauseGame() {
        if (this.game.paused == false) {
            this.game.paused = true;
            this.pause.text = "PAUSE"
        } else {
            this.pause.text = ""
            this.game.paused = false;
        }
    }

    takeScreenShot() {
        // jQuery
        let imgData = this.game.canvas.toDataURL();
        Config.SCREENSHOTS.add(imgData);

        if (Config.SCREENSHOTS.length == 0) {
            $('#div-screenshot').append('<p>There are no screenshots.</p>')
        } else {
            Config.SCREENSHOTS.forEach(function (item) {
                console.log(item);
                $('#div-screenshot').append(`<img src=${item} alt='game screenshot' class='screenshot'>`);
            });
            for (var i = 0; i < Config.SCREENSHOTS.length; i++) {
                $('#div-screenshot').append(`<img src=${Config.SCREENSHOTS[i]} alt='game screenshot' class='screenshot'>`);

            }

        }


    }

    toogleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.mapLayer);
        this.game.physics.arcade.collide(this.player, this.trapsLayer, this.playerDied, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.checks, this.collectCheck, null, this);
        this.game.physics.arcade.overlap(this.player, this.balas, this.playerDied, null, this);
        this.game.physics.arcade.overlap(this.player, this.vidas, this.collectVida, null, this);
        this.game.physics.arcade.overlap(this.player, this.planta, this.playerDied, null, this);
        this.game.physics.arcade.overlap(this.player, this.lava, this.playerDied, null, this);
        this.game.physics.arcade.overlap(this.player, this.nextlevel, this.loadNextLevel, null, this);
        this.game.physics.arcade.collide(this.balas, this.mapLayer, this.destroiBala, null, this);
        this.game.physics.arcade.collide(this.player, this.voadores, this.playerDied, null, this);
        this.game.physics.arcade.collide(this.player, this.bixos, this.playerDied, null, this);
        this.game.physics.arcade.collide(this.player, this.planta_horizontal, this.playerDied, null, this);


        this.bg.tilePosition.x = -this.game.camera.x / 3
        this.bg.tilePosition.y = -this.game.camera.y / 2

        this.bg2.tilePosition.x = -this.game.camera.x / 6
        this.bg2.tilePosition.y = -this.game.camera.y / 4


    }

    destroiBala(bala) {
        bala.kill();

    }

    loadNextLevel() {
        if (!this.levelCleared) {
            this.levelCleared = true
            this.game.camera.fade(0x000000, 1000)
            this.game.camera.onFadeComplete.add(this.changeLevel, this)
        }
    }

    changeLevel() {
        Config.LEVEL += 1
        Config.SCORE = this.score
        Config.VIDAS = this.vidasTotal
        this.game.camera.onFadeComplete.removeAll(this)// bug
        if (Config.LEVEL <= 2)
            this.game.state.restart()
        else
            this.game.state.start('Title')
    }

    collectCheck(player, check) {
        check.destroy();
        player.posicao.x = this.player.x;
        player.posicao.y = this.player.y;

        /*this.request = {
         id: 'player.id',
         game: null,
         op: "save-state",
         data: {x: this.player.x, y: this.player.y}
         };
         ServerComm.ajaxPost(request);*/
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.addScore(coin.points);
        this.trophy.show('first death');
    }

    collectVida(player, vida) {
        vida.destroy();
        this.addVida(vida.points);
    }

    playerDied() {
        this.player.x = this.player.posicao.x;
        this.player.y = this.player.posicao.y;
        this.addVida(-1);
        this.camera.shake(0.02, 200);
        if (this.vidasTotal == 0) {
            this.game.state.start('Play')
        }
    }

    render() {
        if (Config.DEBUG) {
            this.game.debug.body(this.player);
        }
    }
}

setTimeout(this.createBala, 100);

window.onload = function () {
    // funciona como singleton
    const GAME = new Game()
}
