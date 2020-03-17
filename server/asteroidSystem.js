import Asteroid from '../common/entities/Asteroid.js'
import check from './collisionDetection'
import SAT from 'sat'


const asteroids = new Map()

const randomWithinRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const getRandomAsteroid = () => {
    const asteroid = new Asteroid(randomWithinRange(0, 1000),randomWithinRange(0, 1000))
    asteroid.hitbox = SAT.Circle(new SAT.Vector(asteroid.x,asteroid.y), 8);

    asteroid.velocity.x = randomWithinRange(-20, 20)
    asteroid.velocity.y = randomWithinRange(-20, 20)

    console.log(asteroid.hitbox)
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
            if (asteroid.x  !== f.x && asteroid.y  !== f.y){
                if(SAT.testCircleCircle(asteroid.hitbox, f.hitbox))
                    console.log("hit")
            }
        
            if(asteroid.x < 1000 && asteroid.x > 0 && asteroid.y < 1000 && asteroid.y > 0) {
                asteroid.x += asteroid.velocity.x * delta
                asteroid.y += asteroid.velocity.y * delta
                asteroid.hitbox.pos.x = asteroid.x
                asteroid.hitbox.pos.y = asteroid.y
            } else {
                Object.assign(asteroid, getRandomAsteroid())

            }

       
        })
    })
}

export default {
    populate,
    update
}