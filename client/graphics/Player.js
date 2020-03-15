import { Container, Sprite, Graphics } from 'pixi.js'

class Player extends Container {
    constructor(entity) {
        super()

        console.log(entity)

        const sprite = Sprite.from('/images/ship.png')
        sprite.scale.set(3, 3)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)
        
        const hitbox = new Graphics();
        const polyPts = [0,0,100,100,-1000,100];
        hitbox.beginFill(0xffffff);
        hitbox.drawPolygon(polyPts);
        hitbox.endFill();
        this.addChild(hitbox)
    }
}

export default Player
