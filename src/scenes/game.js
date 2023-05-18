class GameInterface extends Phaser.Scene {
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        //first, lets make the cannon
        this.cannon = this.add.container(50, this.cameras.main.height - 50);
        let cannonColor = 0xFF0000;

        this.base = this.add.circle(0, 0, 100, cannonColor);
        this.cannon.add(this.base);

        this.barrel = this.add.rectangle(0, 0, 50, 300, cannonColor);
        this.barrel.setAngle(45);
        this.cannon.add(this.barrel);


        //cannon
        this.onEnter();
    }

    onEnter() {
        //For consumer classes
    }


}