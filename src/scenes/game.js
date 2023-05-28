class GameInterface extends Phaser.Scene {
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1500;

        let color = 0xFFFFFF;
        this.minimumPower = 500;
        this.stepPower = 10;
        this.maximumPower = 2000;
        this.power = this.minimumPower;
        this.powerButton = false; //is the power button being pressed?

        this.balls = [];

        this.score = 0;
        this.targets = this.add.group();

        
        this.cannon = this.newCannon(50, this.cameras.main.height - 50, color);

        let fireDown = () => {
            {
                this.powerButton = true;
            }
        };

        let fireUp = () => {
            this.powerButton = false;
            this.fireCannon(this.cannon, this.balls, this.power, 0x00FF00);
            this.power = this.minimumPower;
        };


        let increaseAngle = () => this.changeAngle(this.cannon, 1, 90, 0);
        let decreaseAngle = () => this.changeAngle(this.cannon, -1, 90, 0)

        this.down = this.newButton(500, this.cameras.main.height - 50, "Down", 0x444444, increaseAngle);
        this.up = this.newButton(500, this.cameras.main.height - 125 - this.down.height, "Up", 0x444444, decreaseAngle);
        
        this.chargeButton = this.newButton(800, this.cameras.main.height - 50, "Charge", 0xFF0000, fireDown, fireUp);

        this.scoreObj = this.add.text(this.cameras.main.width, 0, this.score)
            .setOrigin(1, 0)
            .setFontSize(48);
        
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

    fireCannon(cannon, targets, power, color) {
        let ball = this.newBall(cannon, targets, power, color);
        //do other cannon firing things
        return ball;
    }

    newBall(cannon, balls, power, color) {
        //make a new ball at the end of the barrel
        //get the barrel, then change where the x,y is from
        let barrel = cannon.getByName("barrel");
        //barrel.setOrigin(1, 0.5);
        
        //get the x, y of the barrel
        //let x = cannon.x + barrel.x;
        //let y = cannon.y + barrel.y;
        let coords = undefined;
        coords = barrel.getTopCenter(coords, true); //a Vector2 object

        //barrel.setOrigin(0.5, 0.5);


        let ball = this.add.circle(coords.x, coords.y, 25, color);
        ball = this.physics.add.existing(ball);
        //ball.body.allowGravity(true);

        let rotation = barrel.rotation;
        let vX = Math.sin(rotation) * power;
        let vY = -Math.cos(rotation) * power;
        ball.body.setVelocity(vX, vY);
        
        balls.push(ball);
        //console.log("new ball");
        return ball;
    }

    newButton(x, y, text, color, downFn, upFn = undefined) {
        let button = this.add.container(x,y);
        let padding = 5;
        let textObj = this.add.text(0, 0, text)
            .setFontSize(72)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', downFn);

        if (upFn != undefined) {
            textObj.on('pointerup', upFn);
        }
        
        let background = this.add.rectangle(0, 0, textObj.width + padding, textObj.height + padding, color);
           
        
        button.add(background);
        button.add(textObj);
        return button;
    }
    
    newTarget(x, y, targetGroup, size, color) {
        let target = this.add.circle(x, y, size, color);
        target = this.physics.add.existing(target);
        target.body.allowGravity = false;
        targetGroup.add(target);
        return target;
    }

    changeAngle(cannon, ammount, upperBounds, lowerBounds) {
        let barrel = cannon.getByName("barrel");
        let angle = barrel.angle;
        angle += ammount;
        if (angle >= upperBounds) {
            angle = upperBounds;
        }
        if (angle <= lowerBounds) {
            angle = lowerBounds;
        }
        barrel.setAngle(angle);
    }

    gotoScene(key, data) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, data);
        });
    }

    update() {
        if (this.powerButton && (this.power < this.maximumPower)) {
            this.power += 20;
        }
        //go through all currently active balls
        for (let ball of this.balls)
        {
            this.physics.collide(ball, this.targets, () => {
                let target = this.physics.closest(ball);
                target.gameObject.destroy();
                target.destroy();
                ball.destroy();
                let addedScore = (1/this.time.now) * 1000000000;
                this.score += addedScore;
                this.scoreObj.setText(Math.floor(this.score));
                //console.log(this.score);
                }
            );
        }
        this.onUpdate();
    }

    onUpdate() {
        //For consumer classes
    }
    onEnter() {
        //For consumer classes
    }


}


