export function createVnode (type: Conponent, props?: VnodeProps, children?: VnodeChildren): Vnode{
    return {
        type,
        props,
        children
    }
}
