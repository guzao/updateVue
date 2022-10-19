
type VnodeType = string | object;
type VnodeProps =  object;
type VnodeChildren = string | Vnode [];

type Vnode = {
    type: VnodeType;
    props?: VnodeProps;
    children?: VnodeChildren;
}

type ComponnetVnode = {
    vnode: object,
    type?: object;
    props?: VnodeProps;
    children?: VnodeChildren;
} 