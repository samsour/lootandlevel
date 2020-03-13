import nengi from 'nengi'

class Explosion {
    constructor() {
        this.x = 150
        this.y = 150
        this.rotation = 0
    }
}

Explosion.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true }
}

export default Explosion