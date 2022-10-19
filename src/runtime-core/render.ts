import { processComponent } from "./component"



export function render(vnode: any, rootElment: Element) {
    patch(vnode, rootElment)
}

// 区分虚拟节点的类型 
function patch(vnode: Vnode, rootElment: Element) {
    const { type } = vnode
    if (typeof type == 'object') {
        processComponent(vnode, rootElment)
    } else {
        console.log('[][]')
    }
}
