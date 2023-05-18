class GameInterface extends Phaser.Scene {
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        //first, lets make the cannon
        this.cannon = this.newCannon(50, this.cameras.main.height - 50, 0xFFFFFF);

        this.

        //cannon
        this.onEnter();
    }


    newCannon(x, y, color) {
        //first, lets make the cannon
        cannon = this.add.container(x, y);

        base = this.add.circle(0, 0, 100, color);
        cannon.add(this.base);

        barrel = this.add.rectangle(0, 0, 50, 300, color);
        barrel.setAngle(45);
        
        cannon.add(this.barrel);
        return cannon;
    }



    onEnter() {
        //For consumer classes
    }


}