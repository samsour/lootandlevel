const projectiles = new Map()

const spawnProjectile = (instance, projectile) => {
    instance.addEntity(projectile)
    projectile.diesAt = Date.now() + projectile.timeToLive;
    projectiles.set(projectile.nid, projectile)
}

const update = (instance, now, delta) => {

    projectiles.forEach(projectile => {
        // check if projectile is not already about to die
        if (projectile.nid > 0) {
            // kill projectile if its lifespan has ended
            if (projectile.diesAt < now) {
                instance.removeEntity(projectile)
            }
    
            // move projectile
            projectile.x += delta * projectile.velocity.x;
            projectile.y += delta * projectile.velocity.y;
    
            // handle collision
        }
    })
}

export default {
    spawnProjectile,
    update
}