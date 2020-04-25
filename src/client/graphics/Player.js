import { Container, Sprite } from 'pixi.js'

class Player extends Container {
    constructor() {
        super()

        const sprite = Sprite.from('/assets/images/ship.png')
        sprite.scale.set(3, 3)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)
    }
}

export default Player
