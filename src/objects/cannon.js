class Cannon extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y) {
        super(scene, x, y);
        let color = 0xFF0000;

        this.base = scene.add.circle(0, 0, 10, color);
        this.add(this.base);
        this.barrel = scene.add.rectangle(x, y, 10, 150, color);
        this.barrel.setAngle(-45);
        this.add(this.barrel);
    }

}