import nengi from 'nengi'

class SpecialFireCommand {
    constructor(x, y) {
        // x,y or angle are both okay ways to represent firing
        this.x = x
        this.y = y
    }
}

SpecialFireCommand.protocol = {
    x: nengi.Int32,
    y: nengi.Int32
}

export default SpecialFireCommand
