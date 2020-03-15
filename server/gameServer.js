import nengi from 'nengi'
import SAT from 'sat'
import nengiConfig from '../common/nengiConfig.js'
import instanceHookAPI from './instanceHookAPI.js'
import NetLog from '../common/messages/NetLog.js'
import PlayerCharacter from '../common/entities/PlayerCharacter.js'
import asteroidSystem from './asteroidSystem.js'
import projectileSystem from './projectileSystem.js'
import Identity from '../common/messages/Identity.js'
import Projectile from '../common/entities/Projectile.js'
import WeaponSystem from './weaponSystem.js'

const instance = new nengi.Instance(nengiConfig, { port: 8079 })
instanceHookAPI(instance)

/* serverside state here */
const entities = new Map()
asteroidSystem.populate(instance, 50);

instance.on('connect', ({ client, callback }) => {
    /* client init logic & state */
    callback({ accepted: true, text: 'Welcome!' })
    instance.message(new NetLog('hello world'), client)

    // create new PlayerCharacter
    const entity = new PlayerCharacter()

    instance.addEntity(entity)
    instance.message(new Identity(entity.nid), client)
    entities.set(entity.nid, entity)
    client.entity = entity
    client.view = {
        x: entity.x,
        y: entity.y,
        halfWidth: 1100,
        halfHeight: 1000
    }
    // instanciate an own weaponSystem (handling cooldowns) for each player
    client.weaponSystem = new WeaponSystem(entity.attackRate)
})

instance.on('disconnect', client => {
    entities.delete(client.entity.nid)
    instance.removeEntity(client.entity)
})

/* on('command::AnyCommand', ({ command, client }) => { }) */

/**
 * Player Input logic contains moving & shooting
 * @param {PlayerInput}
 */
instance.on('command::PlayerInput', ({ command, client }) => {
    const { up, down, left, right, mouseDown, mouseX, mouseY, rotation, delta } = command
    const { entity } = client
    
    if (up) {
        entity.y -= entity.velocity.y * delta;
        entity.collider.pos.y = entity.y
    }
    if (down) {
        entity.y += entity.velocity.y * delta
        entity.collider.pos.y = entity.y
    }
    if (left) {
        entity.x -= entity.velocity.x * delta
        entity.collider.pos.x = entity.x
    }
    if (right) {
        entity.x += entity.velocity.x * delta
        entity.collider.pos.x = entity.x
    }
    
    entity.rotation = rotation

    // create bullet and add to global projectile system
    if (mouseDown && client.weaponSystem.fire()) {
        const bullet = new Projectile(entity)
        projectileSystem.spawnProjectile(instance, bullet)
    }
    
})

/**
 * Game loop that contains the serverside game logic
 * @param {number} delta - time difference between the previous frame that was drawn and the current frame
 * @param {number} tick - how many game loops are done so far
 * @param {Date.now} now - represents the current time as a number
 */
const update = (delta, tick, now) => {
    instance.emitCommands()
    /* serverside logic can go here */

    // update all clients
    instance.clients.forEach(client => {
        // update client positions
        client.view.x = client.entity.x
        client.view.y = client.entity.y

         // update client weaponSystem
         client.weaponSystem.update(delta)
    })

    // update asteroid system
    asteroidSystem.update(delta)
    projectileSystem.update(instance, now, delta)

    /* serversode logic end */
    instance.update()
}

export {
    update
}
