import { render } from "./render"
import { createVnode } from "./vnode"


export function createApp (rootComponent: Conponent) {
    return {
        mount (rootElment: Element) {
            const vnode = createVnode(rootComponent)
            render(vnode, rootElment)
        }
    }
}

