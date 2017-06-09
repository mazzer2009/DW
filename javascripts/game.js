class Config {
}
Config.WIDTH = 800
Config.HEIGHT = 480
Config.DEBUG = false
Config.ANTIALIAS = false
Config.ASSETS = 'assets/'

class Game extends Phaser.Game {
    constructor() {
        super(Config.WIDTH, Config.HEIGHT, Phaser.CANVAS,
                'game-container', null, false, Config.ANTIALIAS)

        this.state.add('Play', PlayState, false)
        this.state.start('Play')
    }
}

// Fase 1
class PlayState extends Phaser.State {
    preload() {
        let dir = Config.ASSETS
        // mapa
        this.game.load.tilemap('level1', `${dir}mapacerto.json`,
                null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('mario', `${dir}mario.png`);

        this.game.load.spritesheet('dude', `${dir}dude.png`, 32, 48);
        this.game.load.image('background', `${dir}back2.png`);

        this.game.load.spritesheet('coin', `${dir}coins2.png`, 16, 17);
        this.game.load.spritesheet('nuvem', `${dir}check.png`, 18, 18);

        this.game.load.spritesheet('vida', `${dir}vida.png`, 16, 16);


        this.game.load.spritesheet('bala', `${dir}bala.png`, 21, 20);


        this.game.load.image('trophy', `${dir}trophy-200x64.png`);
    }

    createPlayer() {
        this.player = new Player(this.game, this.keys, 0, 0, 'dude')
        this.game.add.existing(this.player)

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.player.x = 0
        this.player.y = 0
    }

    createMap() {
        // chave para o arquivo .json carregado no metodo preload()
        this.map = this.game.add.tilemap('level1')
        // chave para o arquivo .png de tileset carregado no metodo preload()
        // corresponde ao nome usado para o tileset dentro do Tiled Editor
        this.map.addTilesetImage('mario')

        // deve ter o mesmo nome usado na camada criada no Tiled Editor
        this.mapLayer = this.map.createLayer('Camada de Tiles 1')


        // os indices sao os mesmos para o tiles no Tiled Editor, acrescidos em 1
        this.map.setCollisionBetween(886, 888, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(940, 942, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(994, 996, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(241, 242, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(295, 296, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(581, 583, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(1043, 1045, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(784, 785, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(838, 838, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(1032, 1032, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(393, 393, true, 'Camada de Tiles 1')



        this.mapLayer.resizeWorld()

        this.trapsLayer = this.map.createLayer('Traps')
        this.map.setCollision([829], true, 'Traps')
        this.map.setCollision([830], true, 'Traps')
        this.map.setCollision([771, 825, 879, 710], true, 'Traps')

    }

    createCoins() {
        this.coins = this.game.add.group()
        this.map.createFromObjects('Coins', 1351, 'coin',
                0, true, false, this.coins, Coin)
    }
    createChecks() {
        this.checks = this.game.add.group()
        this.map.createFromObjects('Coins', 1355, 'nuvem',
                0, true, false, this.checks, Nuvem)
    }

    createVida() {
        this.vidas = this.game.add.group()
        this.map.createFromObjects('Coins', 1357, 'vida',
                0, true, false, this.vidas, Vida)
    }

    createBala() {
        this.bala = this.game.add.group()
        this.map.createFromObjects('Coins', 1356, 'bala', 0, true, false, this.bala, Bala)
    }

    cretateHud() {
        this.scoreText = this.game.add.text(16, 16, '', {fontSize: "16px", fill: '#ffffff'});
        this.scoreText.text = "COINS: 0";
        this.scoreText.fixedToCamera = true;


        this.posxy = this.game.add.text(16, 37, '', {fontSize: "16px", fill: '#ffffff'});
        this.posxy.text = "Vidas:3"
        this.posxy.fixedToCamera = true
    }

    addScore(amount) {
        this.score += amount
        this.scoreText.text = "COINS: " + this.score
    }

    addVida(amount) {
        this.vidasTotal += amount

        this.posxy.text = "Vidas: " + this.vidasTotal
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.stage.backgroundColor = '#000000'

        let bg = this.game.add.tileSprite(0, 0,
                Config.WIDTH, Config.HEIGHT, 'background')
        bg.fixedToCamera = true

        this.keys = this.game.input.keyboard.createCursorKeys()
        this.game.physics.arcade.gravity.y = 550
        this.score = 0
        this.vidasTotal = 3

        let fullScreenButton = this.game.input.keyboard.addKey(
                Phaser.Keyboard.ONE)
        fullScreenButton.onDown.add(this.toogleFullScreen, this)

        let screenshotButton = this.game.input.keyboard.addKey(
                Phaser.Keyboard.P)
        screenshotButton.onDown.add(this.takeScreenShot, this)

        this.posy = 0
        this.posx = 0
        this.createMap()
        this.createPlayer()
        this.player.position.setTo(0, 0)
        this.player.x = 0
        this.player.y = 0
        this.createBala()
        this.createVida()
        this.createCoins()
        this.createChecks()
        this.cretateHud()
        this.trophy = new Trophy(this.game)
        this.game.add.existing(this.trophy)
    }

    takeScreenShot() {
        // jQuery
        let imgData = this.game.canvas.toDataURL()

        $('#div-screenshot').append(
                `<img src=${imgData} alt='game screenshot' class='screenshot'>`
                )
    }

    toogleFullScreen() {
        this.game.scale.fullScreenScaleMode =
                Phaser.ScaleManager.EXACT_FIT;
        if (this.game.scale.isFullScreen)
            this.game.scale.stopFullScreen()
        else
            this.game.scale.startFullScreen(false)
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.mapLayer)
        this.game.physics.arcade.collide(
                this.player, this.trapsLayer, this.playerDied, null, this)

        this.game.physics.arcade.overlap(
                this.player, this.coins, this.collectCoin, null, this)

        this.game.physics.arcade.overlap(
                this.player, this.checks, this.collectCheck, null, this)

        this.game.physics.arcade.collide(
                this.player, this.bala, this.batebala, null, this)

        this.game.physics.arcade.overlap(
                this.player, this.vidas, this.collectVida, null, this)





    }

    batebala(player, bala) {
        bala.body.allowGravity = true
        this.playerDied()

    }
    collectCheck(player, check) {
        check.destroy()
        this.posx = this.player.x
        this.posy = this.player.y
    }

    collectCoin(player, coin) {
        coin.destroy()
        this.createBala()
        this.addScore(coin.points)
        this.trophy.show('first death')
    }

    collectVida(player, vida) {
        vida.destroy()
        this.addVida(vida.points)
    }

    playerDied() {
        console.log('player died')
        this.player.x = this.posx
        this.player.y = this.posy
        this.addVida(-1)
        this.createBala()
        this.camera.shake(0.02, 200)
        if (this.vidasTotal == 0) {
            this.create()
        }
    }

    render() {
        if (Config.DEBUG) {
            this.game.debug.body(this.player)
        }
    }
}

const GAME = new Game()
