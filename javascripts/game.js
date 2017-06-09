class Game extends Phaser.Game {
    constructor() {
        super(Config.WIDTH, Config.HEIGHT, Phaser.CANVAS, 'game-container', null, false, Config.ANTIALIAS);

        this.state.add('Play', PlayState, false);
        this.state.start('Play');
    }
}

const GAME = new Game();