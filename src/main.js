class Level1 extends GameInterface {
    constructor() {
        super("level1", "Level 1");
    }
    
    onUpdate() {
        if (this.targets.countActive() <= 0) {
            this.gotoScene("level1end", { score: this.score });
        }
    }

    onEnter() {
        let targetColor = 0xFF0000
        this.target1 = this.newTarget(500, 500, this.targets, 75, targetColor);
    }
}

class Level1End extends LevelEnd {
    constructor() {
        super("level1end", "End of Level 1");
    }

    onEnter() {
        this.nextLevelButton("outro", this.scoreObj);
    }
}


class Outro extends Phaser.Scene { //from D2
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Shoot the targets!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });
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
    scene: [Intro, Level1, Level1End, Outro],
    backgroundColor: 0x000000,
    title: "Cannon Shooter",
});
