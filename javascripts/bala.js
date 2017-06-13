class Bala extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset);
        this.game.physics.arcade.enable(this);
        this.body.allowGravity = false;
        this.autoCull = true;
        this.points = 1;
      // this.body.velocity.x = -250;
        //this.update()
        //this.animations.add('vai', [this.body.velocity.x = -250],5, true)
        //this.animations.play('vai')
    }

    start(){
        this.body.velocity.x = -250;
    }
}