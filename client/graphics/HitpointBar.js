import * as PIXI from 'pixi.js'

class HitpointBar extends PIXI.Container {
    
    
    constructor() {
        super()
        
        this.relativeCoordinates = [-16, -50, 50, 10];

        this.background = new PIXI.Graphics()
        this.background.beginFill(0x000000)
        this.background.drawRect(...this.relativeCoordinates)
        this.background.endFill()

        this.addChild(this.background)
        
        this.foreground = new PIXI.Graphics()
        this.foreground.beginFill(0x80ff80)
        this.foreground.drawRect(...this.relativeCoordinates)
        this.foreground.endFill()
        
        this.addChild(this.foreground)
        
    }

    setHitpointPercentage(percent) {
        this.foreground.scale.x = percent
    }

}

export default HitpointBar;