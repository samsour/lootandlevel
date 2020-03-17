import nengi from 'nengi'
import SAT from 'sat'

class PlayerCharacter {
    constructor() {
        this.x = 50
        this.y = 50
        this.rotation = 0
        this.name = "Display name";
        this.spaceShip = "goliath_t2";
        this.velocity = {
            x: 200,
            y: 200
        }
        this.attackDamage = 10;
        this.attackRate = 2; // times a second
        this.level = 1;
        this.hitpoints = 100;
        this.shield = {
            hitpoints: 100,
            efficiency: 0.25
        }

        this.collider = new SAT.Polygon(new SAT.Vector(), [
            new SAT.Vector(),
            new SAT.Vector(-100,100),
            new SAT.Vector(100,100)
        ]);
    }
}

PlayerCharacter.protocol = {
    name: nengi.String,
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    'velocity.x': nengi.Number,
    'velocity.y': nengi.Number,
    attackDamage: nengi.Number,
    attackRate: nengi.Number,
    hitpoints: nengi.Float32,
    'shield.hitpoints': nengi.Float32,
    'shield.efficiency': nengi.Float32,
    
}

export default PlayerCharacter
