import nengi from 'nengi'

class Asteroid {
    constructor() {
        this.x = 150
        this.y = 150
        this.rotation = 0
        this.velocity = {
            x: 0,
            y: 0
        }
    }
}

Asteroid.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true }
}

export default Asteroid
