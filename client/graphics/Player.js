import { Container, Sprite, Graphics } from 'pixi.js'

class Player extends Container {
    constructor(entity) {
        super()

        const sprite = Sprite.from('/images/ship.png')
        sprite.scale.set(3, 3)
        sprite.anchor.set(0.5, 0.5)
        sprite.rotation = 0.5 * Math.PI
        this.addChild(sprite)
        
        const hitbox = new Graphics();
        let polygonPoints = [];
        entity.collider.points.forEach(vector => {
            polygonPoints = polygonPoints.concat(Object.values(vector))
        })
        console.log(polygonPoints)
        hitbox.beginFill(0xff0000);
        hitbox.drawPolygon(polygonPoints);
        hitbox.endFill();
        this.addChild(hitbox)
    }
}

export default Player
