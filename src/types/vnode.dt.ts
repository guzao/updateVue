type Conponent = {
    props?: object;
    name?: string;
    setup?: (pros: object, ctx?: object) => any;
    render?: () => Vnode | Vnode [];
    [ key: string ]: any
}

type VnodeProps = object
type VnodeChildren = Vnode [] | string

type Vnode = {
    type: Conponent | string,
    props?: object,
    children?: Vnode [] | string;
    el?: Element
}

type ConponentInstance = {
    vnode: Vnode;
    type: Conponent;
    props: object;
    children: string | Vnode[] | undefined;
    setupResult?: object;
    render?: () => Vnode | Vnode []
}