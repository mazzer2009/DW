class Game extends Phaser.Game {
    constructor() {
        super(Config.WIDTH, Config.HEIGHT, Phaser.CANVAS, 'game-container', null, false, Config.ANTIALIAS);

        this.state.add('Play', PlayState, false)
        this.state.add('Title',TitleState, false)   
        this.state.start('Title')
        
    }
}

//const GAME = new Game();