class LevelEnd extends Phaser.Scene {
    init(data) {
        this.score = data.score || 0;
    }
    
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1500;

        this.centerX = this.cameras.main.width/2;
        this.centerY = this.cameras.main.height/2;
        console.log(this.score);
        this.scoreObj = this.add.text(this.centerX, this.centerY, Math.floor(this.score))
            .setOrigin(0.5, 0.5)
            .setFontSize(72);
        this.onEnter();
    }



    newButton(x, y, text, color, downFn = undefined, upFn = undefined) { //from game.js
        console.log(text);
        let button = this.add.container(x,y);
        let padding = 5;
        let textObj = this.add.text(0, 0, text)
            .setFontSize(54)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            
        if (downFn != undefined) {
            textObj.on('pointerdown', downFn);
        }

        if (upFn != undefined) {
            textObj.on('pointerup', upFn);
        }
        
        let background = this.add.rectangle(0, 0, textObj.width + padding, textObj.height + padding, color);
           
        
        button.add(background);
        button.add(textObj);
        return button;
    }

    nextLevelButton(key, scoreObj) {
        let nextScene = () => this.gotoScene(key);
        this.newButton(scoreObj.x, scoreObj.y + scoreObj.height * 1, "Next Level", 0x00FF00, nextScene);
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {

    }
}