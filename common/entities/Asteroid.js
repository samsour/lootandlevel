import nengi from 'nengi'
import SAT from 'sat'

class Asteroid {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.hitbox = SAT.Circle(new SAT.Vector(x,y), 8);
    }
}

Asteroid.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true }
}

export default Asteroid
