class GameInterface extends Phaser.Scene {
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        //first, lets make the cannon
        let color = 0xFFFFFF;
        this.cannon = this.newCannon(50, this.cameras.main.height - 50, color);

        this.testButton = this.newButton(500, 500, "test", this.newBall(this.cannon, 50, color));

        //cannon
        this.onEnter();
    }


    newCannon(x, y, color) {
        //first, lets make the cannon
        let cannon = this.add.container(x, y);

        let base = this.add.circle(0, 0, 100, color);
        base.setName("base");
        cannon.add(base);

        let barrel = this.add.rectangle(0, 0, 50, 300, color);
        barrel.setAngle(45);
        barrel.setName("barrel");
        
        cannon.add(barrel);
        return cannon;
    }

    fireCannon(cannon, power, color) {
        let ball = this.newBall(cannon, power, color);
        //do other cannon firing things
        return ball;
    }

    newBall(cannon, power, color) {
        //make a new ball at the end of the barrel
        //get the barrel, then change where the x,y is from
        let barrel = cannon.getByName("barrel");
        //barrel.setOrigin(1, 0.5);
        
        //get the x, y of the barrel
        //let x = cannon.x + barrel.x;
        //let y = cannon.y + barrel.y;
        
        let coords = barrel.getRightCenter(); //a Vector2 object

        //barrel.setOrigin(0.5, 0.5);


        let ball = this.add.circle(coords.x, coords.y, 25, color);
        ball = this.physics.existing(ball);
        ball.body.allowGravity(true);

        let rotation = barrel.rotation;
        let vX = Math.cos(rotation) * power;
        let vY = Math.sin(rotation) * power;
        ball.body.setVelocity(vX, vY);
        
        return ball;
    }

    newButton(x, y, text, fn) {
        let button = this.add.container(x,y);
        
        let textObj = this.add.text(0, 0, text)
            .setFontSize(24)
            .setOrigin(0.5, 0.5);
        
        let background = this.add.rectangle(0, 0, textObj.width, textObj.height);
           
        
        button.add(background);
        button.add(textObj);

        button.setInteractive();
        button.on('pointerdown', fn());

        return button;
    }


    onEnter() {
        //For consumer classes
    }


}