import Player from '../graphics/Player.js'
import HitboxGraphics from '../graphics/HitboxGraphics.js'
import renderer from '../graphics/renderer.js'

export default (state) => {
    return {
        create({ data, entity }) {
            const graphics = new Player()
            renderer.middleground.addChild(graphics)
            const hitbox = new HitboxGraphics(entity)
            renderer.middleground.addChild(hitbox)
            if (state.myId === entity.nid) {
                state.myEntity = entity
            }
            return hitbox
        },
        delete({ nid, graphics }) {
            renderer.middleground.removeChild(graphics)
        },
        watch: {
        }
    }
}
