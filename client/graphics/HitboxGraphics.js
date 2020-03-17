import { Container, Graphics } from 'pixi.js'

class AsteroidGraphics extends Container {
    constructor(entity) {
        super()

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

export default AsteroidGraphics
