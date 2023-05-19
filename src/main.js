class Test extends GameInterface {
    constructor() {
        super("test", "Test");
    }
    
    onEnter() {
        let targetColor = 0xFF0000
        this.target1 = this.newTarget(500, 500, this.targets, 75, targetColor);

    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    scene: [Test],
    backgroundColor: 0x000000,
    title: "Cannon Shooter",
});
