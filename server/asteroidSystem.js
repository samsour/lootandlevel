import Asteroid from '../common/Asteroid.js'

const randomWithinRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const asteroids = new Map()

const spawnAsteroid = (instance) => {
    const asteroid = new Asteroid()
    asteroid.x = Math.random() * 1000
    asteroid.y = Math.random() * 1000
    asteroid.velocity.x = randomWithinRange(-5, 5)
    asteroid.velocity.y = randomWithinRange(-5, 5)
    asteroid.rotation = randomWithinRange(-1, 1)
    instance.addEntity(asteroid)
    asteroids.set(asteroid.nid, asteroid)
}

const populate = (instance, howManyAsteroids) => {
    for (let i = 0; i < howManyAsteroids; i++) {
        spawnAsteroid(instance)
    }
}

const update = (delta) => {
    asteroids.forEach(asteroid => {
        asteroid.x += asteroid.velocity.x * delta
        asteroid.y += asteroid.velocity.y * delta
    })
}

export default {
    populate,
    update
}