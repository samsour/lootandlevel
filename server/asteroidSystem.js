import Asteroid from '../common/Asteroid.js'

const asteroids = new Map()

const randomWithinRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const spawnAsteroid = (instance) => {
    const asteroid = new Asteroid()
    asteroid.x = Math.random() * 1000
    asteroid.y = Math.random() * 1000
    asteroid.velocity.x = randomWithinRange(-20, 20)
    asteroid.velocity.y = randomWithinRange(-20, 20)
    instance.addEntity(asteroid)
    asteroids.set(asteroid.nid, asteroid)
}

const populate = (instance, spawnRate) => {
    for (let i = 0; i < spawnRate; i++) {
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