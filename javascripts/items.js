class Coin extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false
        this.autoCull = true
        this.points = 1

        this.animations.add('spin', [0, 1, 2, 3], 10, true)
        this.animations.play('spin')
    }
}

class Nuvem extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false
        this.autoCull = true
        this.points = 1

        //   this.animations.add('spin', [1351,1352,1353,1354], 1	0, true)
        // this.animations.play('spin')
    }
}

class Vida extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false
        this.autoCull = true
        this.points = 1

        //   this.animations.add('spin', [1351,1352,1353,1354], 1	0, true)
        // this.animations.play('spin')
    }
}

class Bala extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false
        this.autoCull = true
        this.points = 1
        this.body.velocity.x = -250
        //this.update()
        //   this.animations.add('vai', [this.body.velo], 1	0, true)
        // this.animations.play('spin')
    }

    update() {
        if (this.body.x == 26) {
            this.body.x = 146
        }
    }
}

class Planta extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.allowGravity = false
        this.autoCull = true

        this.animations.add('spin', [0, 1, 2], 5, true)
        this.animations.play('spin')

    }
}
