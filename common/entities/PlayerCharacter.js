import nengi from 'nengi'

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
        // this.drones = []; // add helper drones to gather ressources or make extra dmg
        // this.storage = {
        //     capacity: 100,
        //     items: [
        //         {
        //             id: 6,
        //             name: 'Iridium', // optional
        //             quantity: 25
        //         }
        //     ]
        // }
    }
}

PlayerCharacter.protocol = {
    name: nengi.String,
    x: { type: nengi.Float32, interp: true },
    y: { type: nengi.Float32, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    'velocity.x': { type: nengi.Float32, interp: true },
    'velocity.y': { type: nengi.Float32, interp: true },
    attackDamage: { type: nengi.Float32, interp: true },
    attackRate: { type: nengi.Float32, interp: true },
    hitpoints: { type: nengi.Float32, interp: true },
    'shield.hitpoints': { type: nengi.Float32, interp: true },
    'shield.efficiency': { type: nengi.Float32, interp: true },
}

export default PlayerCharacter
