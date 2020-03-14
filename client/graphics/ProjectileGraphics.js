import { Container, Sprite } from 'pixi.js'

class ProjectileGraphics extends Container {
    constructor() {
        super()

        const sprite = Sprite.from('/images/laser_t1.png')
        sprite.scale.set(2, 3)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)
    }
}

export default ProjectileGraphics