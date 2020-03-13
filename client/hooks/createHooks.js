import playerHooks from './playerHooks.js'
import asteroidHooks from './asteroidHooks.js'
import explosionHooks from './explosionHooks'

export default (state) => {
    return {
        'PlayerCharacter': playerHooks(state),
        'Asteroid': asteroidHooks(state),
        'Explosion': explosionHooks(state)
    }
}
