import nengi from 'nengi'

class Projectile {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.velocity = {
            x: 10,
            y: 10
        }
        this.origin = null; // player id
        this.type = "bullet"; // or rocket
        this.damage = 10; // 10 dmg 
        this.absoluteDamage = false; // ignores armor/shield
        this.timeToLive = 2000 // game ticks
        this.friendlyFire = false; // also hits team members
    }
}

Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    'velocity.x': nengi.Number,
    'velocity.y': nengi.Number,
    origin: nengi.UInt16,
    type: nengi.String,
    damage: nengi.Number,
    absoluteDamage: nengi.Boolean,
    timeToLive: nengi.Number,
    friendlyFire: nengi.Boolean
}

export default Projectile