import nengi from 'nengi'
import NetLog from './messages/NetLog.js'
import PlayerCharacter from './entities/PlayerCharacter.js'
import Asteroid from './entities/Asteroid.js'
import PlayerInput from './commands/PlayerInput.js'
import Identity from './messages/Identity.js'
import Explosion from './entities/Explosion.js'
import Projectile from './entities/Projectile.js'


const config = {
    UPDATE_RATE: 20, 

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8, 

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype', 

    USE_HISTORIAN: true,
    HISTORIAN_TICKS: 40,

    protocols: {
        entities: [
            ['PlayerCharacter', PlayerCharacter],
            ['Asteroid', Asteroid],
            ['Explosion', Explosion],
            ['Projectile', Projectile],
        ],
        localMessages: [],
        messages: [
            ['NetLog', NetLog],
            ['Identity', Identity]
        ],
        commands: [
            ['PlayerInput', PlayerInput]
        ],
        basics: []
    }
}

export default config
