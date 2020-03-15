import Player from '../graphics/Player.js'
import renderer from '../graphics/renderer.js'

export default (state) => {
    return {
        create({ data, entity }) {
            const graphics = new Player(entity)
            renderer.middleground.addChild(graphics)
            if (state.myId === entity.nid) {
                state.myEntity = entity
            }
            return graphics
        },
        delete({ nid, graphics }) {
            renderer.middleground.removeChild(graphics)
        },
        watch: {
        }
    }
}
