import playerHooks from './playerHooks.js'
import asteroidHooks from './asteroidHooks.js'

export default (state) => {
    return {
        'PlayerCharacter': playerHooks(state),
        'Asteroid': asteroidHooks(state)
    }
}
