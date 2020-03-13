import nengi from 'nengi'

class PlayerInput {
    constructor(up, down, left, right, mouseDown, rotation, mouseX, mouseY, delta) {
        this.up = up
        this.down = down
        this.left = left
        this.right = right
        this.mouseDown = mouseDown
        this.rotation = rotation
        this.mouseX = mouseX
        this.mouseY = mouseY
        this.delta = delta
    }
}

PlayerInput.protocol = {
    up: nengi.Boolean,
    down: nengi.Boolean,
    left: nengi.Boolean,
    right: nengi.Boolean,
    mouseDown: nengi.Boolean,
    rotation: nengi.Float32,
    mouseX: nengi.Float32,
    mouseY: nengi.Float32,
    delta: nengi.Number
}

export default PlayerInput
