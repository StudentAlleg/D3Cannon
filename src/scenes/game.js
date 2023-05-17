class Game extends Phaser.Scene {
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.cannon = new Cannon(this, 0, camera.main.height)
        this.onEnter()
    }

    onEnter() {
        //For consumer classes
    }
}