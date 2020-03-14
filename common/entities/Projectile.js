import nengi from 'nengi'

class Projectile {
    constructor(entity) {
        this.x = entity.x;
        this.y = entity.y;
        this.rotation = entity.rotation;
        this.speed = 300;
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

    /**
     * Returns angle between two points in degree
     * @param {*} p1
     * @param {*} p2
     * 
     * @return {number}
     */
    getRotation(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }
}


Projectile.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    'velocity.x': { type: nengi.Number, interp: true },
    'velocity.y': { type: nengi.Number, interp: true },
    origin: { type: nengi.UInt16, interp: true },
    type: { type: nengi.String, interp: true },
    damage: { type: nengi.Number, interp: true },
    absoluteDamage: { type: nengi.Boolean, interp: true },
    timeToLive: { type: nengi.Number, interp: true },
    friendlyFire: { type: nengi.Boolean, interp: true }
}

export default Projectile