import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import instanceHookAPI from './instanceHookAPI.js'
import NetLog from '../common/messages/NetLog.js'
import PlayerCharacter from '../common/entities/PlayerCharacter.js'
import asteroidSystem from './asteroidSystem.js'
import Identity from '../common/messages/Identity.js'
import Explosion from '../common/entities/Explosion.js'
import WeaponSystem from './weaponSystem.js'

const instance = new nengi.Instance(nengiConfig, { port: 8079 })
instanceHookAPI(instance)

/* serverside state here */
const entities = new Map()
asteroidSystem.populate(instance, 50);

instance.on('connect', ({ client, callback }) => {
    /* client init logic & state can go here */
    callback({ accepted: true, text: 'Welcome!' })
    instance.message(new NetLog('hello world'), client)
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
    const ws = new WeaponSystem()
    client.ws = ws
})

instance.on('disconnect', client => {
    entities.delete(client.entity.nid)
    instance.removeEntity(client.entity)
})

/* on('command::AnyCommand', ({ command, client }) => { }) */
instance.on('command::PlayerInput', ({ command, client }) => {
    const { up, down, left, right, mouseDown, mouseX, mouseY, rotation, delta } = command
    const { entity } = client
    const speed = 200
    if (up) {
        entity.y -= speed * delta
    }
    if (down) {
        entity.y += speed * delta
    }
    if (left) {
        entity.x -= speed * delta
    }
    if (right) {
        entity.x += speed * delta
    }
    if (mouseDown && client.ws.fire()){
        const explosion = new Explosion()
        explosion.x = mouseX
        explosion.y = mouseY
        instance.addEntity(explosion)
        setTimeout(()=>{
            instance.removeEntity(explosion)
        },250)
    }
    entity.rotation = rotation
})

const update = (delta, tick, now) => {
    instance.emitCommands()
    /* serverside logic can go here */
    instance.clients.forEach(client => {
        client.view.x = client.entity.x
        client.view.y = client.entity.y

         // update weaponSystem for each client
         client.ws.update(delta)
    })
    asteroidSystem.update(delta)
    instance.update()
}

export {
    update
}
