const { Phaser } = require("../../lib/phaser");

class Cannon extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y) {
        super(scene, x, y);
        color = 0xFFFFFF

        this.base = scene.add.circle(0, 0, 10, color);
        this.add(base);
        this.barrel = scene.add.rectangle(x, y, 10, 150, color);
        this.barrel.setAngle(-45);
        this.add(barrel);
    }

}