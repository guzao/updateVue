import { createVnode } from "./vnode";

export function h (type: VnodeType, props?: VnodeProps, children?: VnodeChildren): Vnode {
    return createVnode(type, props, children)
}