class WeaponSystem {
    constructor(attackRate) {
        this.cooldown = 1 / attackRate
        this.onCooldown = false
        this.acc = 0
    }
    update(delta) {
        if (this.onCooldown) {
            this.acc += delta
            if (this.acc >= this.cooldown) {
                this.acc = 0
                this.onCooldown = false
            }
        }
    }
    fire() {
        if (!this.onCooldown) {
            this.onCooldown = true
            return true
        }
        return false
    }
}
export default WeaponSystem;