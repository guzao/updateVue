export function createVnode (type: VnodeType, props?: VnodeProps, children?: VnodeChildren): Vnode{
    return {
        type,
        props,
        children
    }
}
