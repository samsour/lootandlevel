import * as PIXI from 'pixi.js'
import HitpointBar from './HitpointBar'

class PlayerCharacter extends PIXI.Container {
    constructor(entity) {
        super()
        this.nid = entity.nid
        this.x = entity.x
        this.y = entity.y
        this.isAlive = entity.isAlive

        this.hitpointBar = new HitpointBar()
        this.hitpointBar.x = -6
        this.hitpointBar.y = -20
        this.hitpointBar.setHitpointPercentage(entity._hitpoints/100)

        this._hitpoints = 0
        this.hitpoints = entity.hitpoints
        this.rotation = entity.rotation

        this.body = new PIXI.Sprite.from('images/player.png')
        this.body.width = 100;
        this.body.height = 100;
        this.body.anchor.set(0.5, 0.75  );
        
        this.addChild(this.body)
        this.addChild(this.hitpointBar)
    }

    set hitpoints(value) {
        this._hitpoints = value
        this.hitpointBar.setHitpointPercentage(value/100)
    }

    hide() {
        console.log('trying to hide')
        this.body.visible = false
        this.hitpointBar.visible = false
    }

    update(delta) {
        // direction is either 1 (right), -1 (left), 0 on (default/initial direction) 
        if (this.direction > 0) {
            this.body.scale.x = Math.abs(this.body.scale.x)
        } else if (this.direction < 0) {
            this.body.scale.x = -(Math.abs(this.body.scale.x))
        }
    }
}

export default PlayerCharacter