const projectiles = new Map()

const spawnProjectile = (instance, projectile) => {
    instance.addEntity(projectile)
    projectiles.set(projectile.nid, projectile)

    setTimeout(() => {
        projectiles.delete(projectile);
    }, projectile.timeToLive)
}

const update = (delta) => {
    
    projectiles.forEach(projectile => {
        // destroy projectile after timeToLive exceeds

        // move bullet
        projectile.x += delta * projectile.velocity.x;
        projectile.y -= delta * projectile.velocity.y;

        // handle collision
    })
}

export default {
    spawnProjectile,
    update
}