import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import clientHookAPI from './clientHookAPI.js'
import createHooks from './hooks/createHooks.js'
import renderer from './graphics/renderer.js'
import { frameState, releaseKeys, currentState } from './input.js'
import PlayerInput from '../common/commands/PlayerInput.js'
import ChatUI from './chatUI.js';

const client = new nengi.Client(nengiConfig, 100)
let serverAdress = 'ws://localhost:8001';
if (process.env.NODE_ENV == 'development') {
    serverAdress = 'ws://localhost:8001'
}
console.info("Connect to Server at:", serverAdress);
client.connect(serverAdress)

const chatUI = new ChatUI({
    apiUrl: 'https://ccs.maier-niklas.de/api/v1',
    selector: '.js-chat',
    username: 'samsour',
    password: 'qwer'
});

const state = {
    /* clientside state can go here */
    myId: null,
    myEntity: null
}

/* create hooks for any entity create, delete, and watch properties */
clientHookAPI(client, createHooks(state))

client.on('connected', res => { console.log('connection?:', res) })
client.on('disconnected', () => { console.log('connection closed') })

/* on('message::AnyMessage', msg => { }) */
client.on('message::NetLog', message => {
    console.log(`NetLog: ${ message.text }`)
})

client.on('message::Identity', message => {
    state.myId = message.entityId
})


/**
 * Game loop that contains the clientside game logic
 * @param {number} delta - time difference between the previous frame that was drawn and the current frame
 * @param {number} tick - how many game loops are done so far
 * @param {Date.now} now - represents the current time as a number
 */
const update = (delta, tick, now) => {
    client.readNetworkAndEmit()

    /* clientside logic can go here */
    if (state.myEntity) {
        const { up, down, left, right, mouseDown } = frameState
        const { mouseX, mouseY } = currentState

        // calculate absolute position in world + rotation (of player and object)
        const worldCoords = renderer.toWorldCoordinates(mouseX, mouseY)
        const dx = worldCoords.x - state.myEntity.x
        const dy = worldCoords.y - state.myEntity.y
        const rotation = Math.atan2(dy, dx)
       
        
        client.addCommand(new PlayerInput(up, down, left, right, mouseDown, rotation, worldCoords.x, worldCoords.y, delta))
        renderer.centerCamera(state.myEntity)
    }

    renderer.update(delta)
    client.update()
    releaseKeys()
}

export {
    update,
    state
}
