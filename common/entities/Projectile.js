import nengi from 'nengi'

class Projectile {
    constructor(entity) {
        this.x = entity.x;
        this.y = entity.y;
        this.rotation = entity.rotation;
        this.speed = 400;

        this.velocity = {
            x: this.speed * Math.cos(this.rotation),
            y: this.speed * Math.sin(this.rotation),
        }
        this.origin = entity.nid; // player id
        this.type = "bullet"; // or rocket
        this.damage = entity.attackDamage;
        this.absoluteDamage = false; // ignores armor/shield
        this.timeToLive = 2000 // game ticks
        this.friendlyFire = false; // also hits team members
    }
}

Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    'velocity.x': { type: nengi.Number, interp: true },
    'velocity.y': { type: nengi.Number, interp: true },
    origin: { type: nengi.UInt16 },
    type: { type: nengi.String },
    damage: { type: nengi.Number, interp: true },
    absoluteDamage: { type: nengi.Boolean },
    timeToLive: { type: nengi.UInt32, interp: true },
    friendlyFire: { type: nengi.Boolean }
}

export default Projectile