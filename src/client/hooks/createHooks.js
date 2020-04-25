import playerHooks from './playerHooks.js'
import asteroidHooks from './asteroidHooks.js'
import explosionHooks from './explosionHooks'
import projectileHooks from './projectileHooks'

export default (state) => {
    return {
        'PlayerCharacter': playerHooks(state),
        'Asteroid': asteroidHooks(state),
        'Explosion': explosionHooks(state),
        'Projectile': projectileHooks(state),
    }
}
