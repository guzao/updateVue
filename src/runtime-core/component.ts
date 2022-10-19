export function processComponent(vnode: Vnode, container: Element) {
    mountComponnet(vnode, container)
}


export function mountComponnet(vnode: Vnode, container: Element) {
    console.log('guzai', vnode, container)
    const componnetInstance = createComponnetInstance(vnode, container)
}

export function createComponnetInstance (vnode: Vnode, container: Element): ComponnetVnode {
    const instance = {
        vnode,
        pros: vnode.props,
        children: vnode.children
    }
    return instance
}