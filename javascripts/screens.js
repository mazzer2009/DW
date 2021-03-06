class TitleState extends GameState {
    preload() {
        let dir = Config.ASSETS
        this.game.load.image('title', `${dir}title.png`);
    }

    create() {
        super.create()

        setInterval(function () {
            ServerComm.ajaxPost({}, function () {});
        }, 1000);

        this.imgTitle = this.game.add.image(0, 0, 'title')
        this.imgTitle.anchor.setTo(0.5, 0.5)
        this.imgTitle.x = this.game.width / 2
        this.imgTitle.y = 150

        this.pressStart = this.game.add.text(0, 0,
                'Press ENTER to begin',
                {fontSize: '16px', fill: '#ffffff'})
        this.pressStart.anchor.setTo(0.5, 0.5)
        this.pressStart.x = this.game.width / 2
        this.pressStart.y = 300

        let startButton = this.game.input.keyboard.addKey(
                Phaser.Keyboard.ENTER)
        startButton.onDown.add(this.startFade, this)

        // qualquer tecla muda para a proxima cena
        //this.game.input.onDown.add(this.startFade, this)

        // fade no titulo
        this.imgTitle.alpha = 0.3
        this.game.add.tween(this.imgTitle)
                .to({alpha: 1}, 2000)
                .to({alpha: 0.3}, 2000)
                .loop(-1)
                .start()

        // fade no presstart
        this.game.add.tween(this.pressStart)
                .to({alpha: 0}, 500)
                .to({alpha: 1}, 500)
                .loop(-1)
                .start()

        this.pressed = false
    }

    startFade() {
    /*    if (!this.pressed) {
            if(Config.PROFILE.id===""){
                alert("Login to begin")
                return
        }*/
            this.pressed = true
            this.game.camera.fade(0x000000, 1000)
            this.game.camera.onFadeComplete.add(this.startGame, this)
        //}
    }

    startGame() {
        // preparar o jogo
        // reset de highscore e controle de carregamento de estado do servidor
        Config.SCORE = 0
        Config.LEVEL = 1

        // evitar bug de levar o callback para outra tela (state)
        this.game.camera.onFadeComplete.removeAll(this)
        this.game.state.start('Play')
    }

    update() {
    }
}


class GameOver extends GameState {
    preload() {
        let dir = Config.ASSETS
        this.game.load.image('title', `${dir}gameover.png`);
    }

    create() {
        super.create()

        this.imgTitle = this.game.add.image(0, 0, 'title')
        this.imgTitle.anchor.setTo(0.5, 0.5)
        this.imgTitle.x = this.game.width / 2
        this.imgTitle.y = 150

        this.pressStart = this.game.add.text(0, 0,
                'Press ENTER to try again',
                {fontSize: '16px', fill: '#ffffff'})
        this.pressStart.anchor.setTo(0.5, 0.5)
        this.pressStart.x = this.game.width / 2
        this.pressStart.y = 300

        let startButton = this.game.input.keyboard.addKey(
                Phaser.Keyboard.ENTER)
        startButton.onDown.add(this.startFade, this)

        // qualquer tecla muda para a proxima cena
        //this.game.input.onDown.add(this.startFade, this)

        // fade no titulo
        this.imgTitle.alpha = 0.3
        this.game.add.tween(this.imgTitle)
                .to({alpha: 1}, 2000)
                .to({alpha: 0.3}, 2000)
                .loop(-1)
                .start()

        // fade no presstart
        this.game.add.tween(this.pressStart)
                .to({alpha: 0}, 500)
                .to({alpha: 1}, 500)
                .loop(-1)
                .start()

        this.pressed = false
    }

    startFade() {
        /*if (!this.pressed) {
              if(Config.PROFILE.id===""){
                alert("Login to begin")
                return
        }*/
            this.pressed = true
            this.game.camera.fade(0x000000, 1000)
            this.game.camera.onFadeComplete.add(this.startGame, this)
        //}
    }

    startGame() {
        // preparar o jogo
        // reset de highscore e controle de carregamento de estado do servidor
        Config.SCORE = 0
        Config.LEVEL = 1

        // evitar bug de levar o callback para outra tela (state)
        this.game.camera.onFadeComplete.removeAll(this)
        this.game.state.start('Play')
    }

    update() {
    }
}

class Win extends GameState {
    preload() {
        let dir = Config.ASSETS
        this.game.load.image('title', `${dir}win.png`);
    }

    create() {
        super.create()

        this.imgTitle = this.game.add.image(0, 0, 'title')
        this.imgTitle.anchor.setTo(0.5, 0.5)
        this.imgTitle.x = this.game.width / 2
        this.imgTitle.y = 150

        this.pressStart = this.game.add.text(0, 0,
                'Press ENTER to play again',
                {fontSize: '16px', fill: '#ffffff'})
        this.pressStart.anchor.setTo(0.5, 0.5)
        this.pressStart.x = this.game.width / 2
        this.pressStart.y = 300

        let startButton = this.game.input.keyboard.addKey(
                Phaser.Keyboard.ENTER)
        startButton.onDown.add(this.startFade, this)

        // qualquer tecla muda para a proxima cena
        //this.game.input.onDown.add(this.startFade, this)

        // fade no titulo
        this.imgTitle.alpha = 0.3
        this.game.add.tween(this.imgTitle)
                .to({alpha: 1}, 2000)
                .to({alpha: 0.3}, 2000)
                .loop(-1)
                .start()

        // fade no presstart
        this.game.add.tween(this.pressStart)
                .to({alpha: 0}, 500)
                .to({alpha: 1}, 500)
                .loop(-1)
                .start()

        this.pressed = false
    }

    startFade() {
        /*if (!this.pressed) {
             if(Config.PROFILE.id===""){
                alert("Login to begin")
                return
        }*/
            this.pressed = true
            this.game.camera.fade(0x000000, 1000)
            this.game.camera.onFadeComplete.add(this.startGame, this)
        //}
    }

    startGame() {
        // preparar o jogo
        // reset de highscore e controle de carregamento de estado do servidor
        Config.SCORE = 0
        Config.LEVEL = 1

        // evitar bug de levar o callback para outra tela (state)
        this.game.camera.onFadeComplete.removeAll(this)
        this.game.state.start('Play')
    }

    update() {
    }
}