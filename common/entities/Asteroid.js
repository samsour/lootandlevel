import nengi from 'nengi'
var SAT = require('sat');

class Asteroid {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        this.hitbox = new SAT.Circle(new SAT.Vector(x,y), 16);
    }
}

Asteroid.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true }
}

export default Asteroid
