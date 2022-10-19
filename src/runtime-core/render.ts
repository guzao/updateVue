import { processComponent } from "./component"


export function render(vnode: Vnode, rootElment: Element) {
    patch(vnode, rootElment)
}

// 区分虚拟节点的类型 
export function patch(vnode: Vnode, rootElment: Element) {
    const { type } = vnode
    if (typeof type == 'object') {
        processComponent(vnode, rootElment)
    } else {
        processElment(vnode, rootElment)
    }
}

function processElment(vnode: Vnode, rootElment: Element) {
    mountElment(vnode, rootElment)
}

function mountElment(vnode: Vnode, rootElment: Element) {
    const { type, children } = vnode
    const el = vnode.el = document.createElement(type as any) as Element
    if (Array.isArray(children)) {
        mountChildrenElment(children as Vnode[], el)
    } else {
        el.innerHTML = children as string
    }
    rootElment.append(el)
}

function mountChildrenElment(vnodeChildren: Vnode[], container: Element) {
    vnodeChildren.forEach(v => {
        patch(v, container)
    });
}
