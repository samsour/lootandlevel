import Asteroid from '../common/entities/Asteroid.js'
import check from './collisionDetection'
var SAT = require('sat');


const asteroids = new Map()

const randomWithinRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const getRandomAsteroid = () => {
    const asteroid = new Asteroid(randomWithinRange(0, 1000),randomWithinRange(0, 1000))
    asteroid.velocity.x = randomWithinRange(-20, 20)
    asteroid.velocity.y = randomWithinRange(-20, 20)

    return asteroid;
}

const spawnAsteroid = (instance) => {
    const asteroid = getRandomAsteroid()
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
        
        asteroids.forEach(f =>{
            if (asteroid.nid  != f.nid){
                if(SAT.testCircleCircle(asteroid.hitbox, f.hitbox))
                    console.log("hit")
            }
        })

       if(asteroid.x < 1000 && asteroid.x > 0 && asteroid.y < 1000 && asteroid.y > 0) {
           asteroid.x += asteroid.velocity.x * delta
           asteroid.y += asteroid.velocity.y * delta
       } else {
           Object.assign(asteroid, getRandomAsteroid())
       }
    })
}

export default {
    populate,
    update
}